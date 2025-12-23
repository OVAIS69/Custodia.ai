from src.data.generators import IAMDataGenerator

if __name__ == "__main__":
    print("Generating NEW AI Access Sentinel sample data...")
    print("=" * 60)

    generator = IAMDataGenerator()

    # Generate main dataset with different parameters
    # More users (300 vs 200), more events per user (60 vs 50), higher anomaly ratio (0.08 vs 0.05)
    df = generator.generate_complete_dataset(
        num_users=300,
        normal_events_per_user=60,
        anomaly_ratio=0.08,
        output_path='data/new_iam_logs.csv'
    )

    print("\n" + "=" * 60)
    print("New data generation complete: data/new_iam_logs.csv")
