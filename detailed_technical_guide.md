# Custodia: Technical Explanation Guide

## 1. Project Overview
**Custodia** is an advanced **User and Entity Behavior Analytics (UEBA)** system designed to secure Identity and Access Management (IAM) environments. It leverages machine learning to detect anomalies, score user risk, and optimize Role-Based Access Control (RBAC).

**Version 1.1** introduces a critical integration with **CrowdStrike Falcon ITDR** (Identity Threat Detection and Response), merging internal behavioral logic with external threat intelligence.

---

## 2. System Architecture

The system follows a modern microservices-style architecture:

### 2.1 Backend Layer (`src/`)
- **Framework**: **FastAPI** (Python).
- **Runtime**: Asynchronous execution using `uvicorn`.
- **Core Responsibility**: Handles data ingestion, ML inference, API serving, and third-party integrations.

### 2.2 Frontend Layer (`frontend/`)
- **Framework**: **Next.js** (React 19).
- **Styling**: **Tailwind CSS**.
- **Visualization**: **Recharts** for risk trends and distribution graphs.
- **Interactivity**: **Framer Motion** for UI animations.

### 2.3 Data & ML Pipeline (`src/models/`, `src/data/`)
- **Data Processing**: Pandas/NumPy for vectorization of audit logs.
- **ML Engine**: Scikit-Learn (Isolation Forest, Random Forest) and TensorFlow/Keras (planned for LSTM/Transformers).
- **Integration**: CrowdStrike FalconPy SDK for external threat signals.

---

## 3. Core Logic & Algorithms (Technical Deep Dive)

This section explains the internal logic "word-for-word" based on the implemented code.

### 3.1 Risk Scoring Engine (`src/models/risk_scorer.py`)
The risk score is a **weighted sum** of multiple vectors, normalized to a 0-100 scale.

**Formula:**
$$ RiskScore = \sum (Factor\_Score_i \times Weight_i) $$

#### Factor Breakdown:
| Factor | Weight (Base) | Weight (w/ Falcon) | Technical Implementation |
|:---|:---:|:---:|:---|
| **Anomaly Score** | 30% | 22.5% | `min(100, anomaly_ratio * 500)` <br> *Derivation:* Ratio of anomalous events to total events. |
| **Peer Deviation** | 20% | 15% | `min(100, z_score * 33)` <br> *Derivation:* Calculates Z-Score of user's resource access count vs. their department's mean. |
| **Sensitive Access** | 20% | 15% | `(sensitive_ratio * 60) + (risky_action_ratio * 40)` <br> *Derivation:* Frequency of hitting 'high_sensitivity' resources (e.g., payroll). |
| **Failed Attempts** | 15% | 11.25% | `min(100, failure_ratio * 1000)` <br> *Derivation:* Ratio of failed login/access attempts. High multiplier (1000) makes even small failures significant. |
| **Policy Violations** | 15% | 11.25% | `min(100, violation_ratio * 500)` <br> *Derivation:* Checks specific flags: `is_business_hours`, `is_suspicious_location`. |
| **Falcon Threat** | 0% | 25% | **New in v1.1**. See Section 3.4. |

### 3.2 Anomaly Detection (`src/models/anomaly_detector.py`)
- **Algorithm**: **Isolation Forest**.
- **Why?**: Efficient at detecting outliers in high-dimensional datasets without requiring labeled training data (Unsupervised Learning).
- **Feature Vectors**: `[is_business_hours, is_suspicious_location, resource_risk_score, action_risk_score]`.
- **Output**: Returns -1 (Anomaly) or 1 (Normal), mapped to a confidence score.

### 3.3 Role Mining (`src/models/role_miner.py`)
- **Goal**: Group users with similar access patterns to suggest optimized roles.
- **Algorithm**: **K-Means Clustering** (or similar clustering technique).
- **Logic**:
    1.  Vectorize user access entitlements (One-Hot Encoding of resources).
    2.  Apply clustering to find natural groupings.
    3.  Label clusters as "Candidate Roles".
    4.  **Role Explosion Detection**: Calculates `total_roles / total_users`. If the ratio differs significantly from the ideal, it flags "Role Explosion".

### 3.4 CrowdStrike Falcon Integration (`src/integrations/`)
- **Connector** (`crowdstrike_connector.py`): Manages authentication via OAuth2 (`client_id`, `client_secret`) with the Falcon API.
- **Webhook Handler** (`falcon_event_parser.py`): Listens for incoming IDP (Identity Protection) alerts.
- **Correlation Logic** (`alert_correlator.py`):
    -   When a Falcon alert arrives (e.g., `LateralMovement`), the system queries the internal ML engine for recent anomalies for that specific `user_id`.
    -   **Fusion**: If Internal ML Risk > 50 AND Falcon Severity > Medium, a **Correlated Incident** is raised with a boosted score (often >90).

---

## 4. API Endpoints (Technical Summary)

### **Analysis Endpoints**
- `POST /api/v1/analyze/access`: Real-time inference. Accepts an event JSON, returns `is_anomaly` (bool) and `risk_score` (float).
- `POST /api/v1/analyze/batch`: High-throughput endpoint for bulk log processing.

### **Risk & User Endpoints**
- `GET /api/v1/user/{user_id}/risk-score`: Triggers the `RiskScorer.calculate_user_risk_score` method. Returns the full factor breakdown and 30-day trend.
- `GET /api/v1/falcon/user/{user_id}/risk`: **(v1.1)** Enriched endpoint that merges local logs with remote Falcon threat intel.

### **Roles Endpoints**
- `POST /api/v1/roles/discover`: Triggers the training of the `RoleMiner` model. Returns discovered clusters and entitlement recommendations.

---

## 5. Technical Data Flow

1.  **Ingestion**: Log data (CSV/JSON) is loaded into `pandas.DataFrame`.
2.  **Preprocessing**: `IAMDataPreprocessor` cleans data, handles missing values, and encodes categorical variables (Resource Name -> Integer ID).
3.  **Training (Background)**:
    -   `AnomalyDetector` fits on the "normal" behavioral baseline.
    -   `RoleMiner` identifies clusters.
4.  **Inference (Real-time)**:
    -   Event hits `/analyze/access`.
    -   Preprocessor transforms request.
    -   `AnomalyDetector.predict()` returns outcome.
    -   `RiskScorer` computes auxiliary factors (Policy, Sensitivity).
    -   Final JSON response sent to Frontend.

---
**Custodia** represents a hybrid approach to security: **Statistical baselining** (Isolation Forest) + **Heuristic rules** (Risk Weights) + **External Intelligence** (CrowdStrike).
