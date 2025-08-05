# Student Marks and Grades Calculator

# Grade assignment function
def assign_grade(average):
    if average >= 90:
        return 'A+'
    elif average >= 80:
        return 'A'
    elif average >= 70:
        return 'B+'
    elif average >= 60:
        return 'B'
    elif average >= 50:
        return 'C'
    else:
        return 'D'

# Input student data
students = [
    {
        'name': 'Alice Johnson',
        'marks': [92.5, 88.0, 95.2, 90.0, 87.5]
    },
    {
        'name': 'Bob Smith',
        'marks': [76.2, 82.5, 74.8, 79.0, 81.3]
    },
    {
        'name': 'Carol Davis',
        'marks': [95.0, 93.7, 97.5, 94.2, 96.0]
    },
    {
        'name': 'David Wilson',
        'marks': [61.3, 69.8, 59.5, 65.0, 63.2]
    }
]

# Process each student
total_scores = []
print("{:<15} {:>6} {:>8} {:>8}".format("Student", "Total", "Average", "Grade"))
print("-" * 45)
for student in students:
    total = sum(student['marks'])
    average = total / len(student['marks'])
    grade = assign_grade(average)
    total_scores.append(average)
    print("{:<15} {:>6.2f} {:>8.2f} {:>8}".format(student['name'], total, average, grade))

# Compute class average
class_average = sum(total_scores) / len(total_scores)

# Find topper
topper_index = total_scores.index(max(total_scores))
topper_name = students[topper_index]['name']
topper_score = max(total_scores)

print("\nClass Average: {:.2f}".format(class_average))
print("Class Topper: {} with {:.2f}".format(topper_name, topper_score))
