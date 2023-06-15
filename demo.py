def create_star_pattern(rows):
    for i in range(rows):
        for j in range(i + 1):
            print("*", end=" ")
        print()

    for i in range(rows - 1, 0, -1):
        for j in range(i):print("*", end=" ")
        print()

# Example usage
num_rows = 5
create_star_pattern(num_rows)
