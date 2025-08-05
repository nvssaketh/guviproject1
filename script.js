// Student data array
let students = [
    {
        name: 'Alice Johnson',
        marks: { math: 92.5, science: 88.0, english: 95.2, social: 90.0, arts: 87.5 }
    },
    {
        name: 'Bob Smith',
        marks: { math: 76.2, science: 82.5, english: 74.8, social: 79.0, arts: 81.3 }
    },
    {
        name: 'Carol Davis',
        marks: { math: 95.0, science: 93.7, english: 97.5, social: 94.2, arts: 96.0 }
    },
    {
        name: 'David Wilson',
        marks: { math: 61.3, science: 69.8, english: 59.5, social: 65.0, arts: 63.2 }
    }
];

// Grade assignment function
function assignGrade(average) {
    if (average >= 90) return 'A+';
    else if (average >= 80) return 'A';
    else if (average >= 70) return 'B+';
    else if (average >= 60) return 'B';
    else if (average >= 50) return 'C';
    else return 'D';
}

// Calculate student statistics
function calculateStudentStats(student) {
    const marks = Object.values(student.marks);
    const total = marks.reduce((sum, mark) => sum + mark, 0);
    const average = total / marks.length;
    const grade = assignGrade(average);
    
    return {
        name: student.name,
        marks: student.marks,
        total: total.toFixed(1),
        average: average.toFixed(2),
        grade: grade
    };
}

// Get grade CSS class
function getGradeClass(grade) {
    return `grade-${grade.toLowerCase().replace('+', '-plus')}`;
}

// Render student table
function renderTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    
    students.forEach((student, index) => {
        const stats = calculateStudentStats(student);
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td><strong>${stats.name}</strong></td>
            <td>${stats.marks.math}</td>
            <td>${stats.marks.science}</td>
            <td>${stats.marks.english}</td>
            <td>${stats.marks.social}</td>
            <td>${stats.marks.arts}</td>
            <td><strong>${stats.total}</strong></td>
            <td><strong>${stats.average}</strong></td>
            <td><span class="grade-badge ${getGradeClass(stats.grade)}">${stats.grade}</span></td>
            <td><button class="delete-btn" onclick="deleteStudent(${index})">Delete</button></td>
        `;
        
        tableBody.appendChild(row);
    });
    
    updateClassStats();
}

// Update class statistics
function updateClassStats() {
    if (students.length === 0) {
        document.getElementById('classAverage').textContent = '0.00/100';
        document.getElementById('classGrade').textContent = 'Grade: -';
        document.getElementById('topperName').textContent = 'No students';
        document.getElementById('topperScore').textContent = '0.00/100';
        return;
    }
    
    const allStats = students.map(calculateStudentStats);
    const averages = allStats.map(stat => parseFloat(stat.average));
    
    // Calculate class average
    const classAverage = averages.reduce((sum, avg) => sum + avg, 0) / averages.length;
    const classGrade = assignGrade(classAverage);
    
    // Find topper
    const maxAverage = Math.max(...averages);
    const topperIndex = averages.indexOf(maxAverage);
    const topper = allStats[topperIndex];
    
    // Update UI
    document.getElementById('classAverage').textContent = `${classAverage.toFixed(2)}/100`;
    document.getElementById('classGrade').textContent = `Grade: ${classGrade}`;
    document.getElementById('topperName').textContent = topper.name;
    document.getElementById('topperScore').textContent = `${topper.average}/100`;
}

// Add new student
function addStudent(event) {
    event.preventDefault();
    
    const name = document.getElementById('studentName').value.trim();
    const math = parseFloat(document.getElementById('mathematics').value) || 0;
    const science = parseFloat(document.getElementById('science').value) || 0;
    const english = parseFloat(document.getElementById('english').value) || 0;
    const social = parseFloat(document.getElementById('social').value) || 0;
    const arts = parseFloat(document.getElementById('arts').value) || 0;
    
    if (!name) {
        alert('Please enter a student name');
        return;
    }
    
    // Check for duplicate names
    if (students.some(student => student.name.toLowerCase() === name.toLowerCase())) {
        alert('A student with this name already exists');
        return;
    }
    
    const newStudent = {
        name: name,
        marks: {
            math: math,
            science: science,
            english: english,
            social: social,
            arts: arts
        }
    };
    
    students.push(newStudent);
    renderTable();
    
    // Reset form
    document.getElementById('studentForm').reset();
    
    // Show success message
    showNotification('Student added successfully!', 'success');
}

// Delete student
function deleteStudent(index) {
    if (confirm('Are you sure you want to delete this student?')) {
        students.splice(index, 1);
        renderTable();
        showNotification('Student deleted successfully!', 'info');
    }
}

// Show notification
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : '#2196f3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 1000;
        font-weight: 600;
        transition: all 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Render initial table
    renderTable();
    
    // Add form event listener
    document.getElementById('studentForm').addEventListener('submit', addStudent);
    
    // Add input validation
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value < 0) this.value = 0;
            if (this.value > 100) this.value = 100;
        });
    });
});

// Export data functionality
function exportData() {
    const allStats = students.map(calculateStudentStats);
    const csvContent = [
        ['Student Name', 'Math', 'Science', 'English', 'Social', 'Arts', 'Total', 'Average', 'Grade'],
        ...allStats.map(stat => [
            stat.name,
            stat.marks.math,
            stat.marks.science,
            stat.marks.english,
            stat.marks.social,
            stat.marks.arts,
            stat.total,
            stat.average,
            stat.grade
        ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_results.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

// Add export button to header (optional)
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const exportBtn = document.createElement('button');
    exportBtn.textContent = 'Export Results';
    exportBtn.style.cssText = `
        margin-top: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
    `;
    exportBtn.onclick = exportData;
    header.appendChild(exportBtn);
});
