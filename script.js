// تحديث الوقت
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById('current-time').textContent = timeString;
}

// محاكاة بيانات النظام
function simulateSystemStats() {
    // وحدة المعالجة المركزية
    const cpuUsage = Math.random() * 100;
    const cpuBar = document.getElementById('cpu-bar');
    const cpuValue = document.getElementById('cpu-value');
    cpuBar.style.width = `${cpuUsage}%`;
    cpuValue.textContent = `${cpuUsage.toFixed(1)}%`;
    
    // الذاكرة
    const memoryUsage = Math.random() * 100;
    const memoryBar = document.getElementById('memory-bar');
    const memoryValue = document.getElementById('memory-value');
    memoryBar.style.width = `${memoryUsage}%`;
    memoryValue.textContent = `${memoryUsage.toFixed(1)}%`;
    
    // الشبكة
    const uploadSpeed = Math.random() * 1000;
    const downloadSpeed = Math.random() * 1000;
    document.getElementById('upload-value').textContent = `${uploadSpeed.toFixed(1)} KB/s`;
    document.getElementById('download-value').textContent = `${downloadSpeed.toFixed(1)} KB/s`;
}

// محاكاة الطرفية
let terminalInput = '';
const terminalCommands = {
    'help': [
        'الأوامر المتاحة:',
        '  help    - عرض هذه المساعدة',
        '  clear   - مسح الشاشة',
        '  echo    - عرض نص',
        '  date    - عرض التاريخ والوقت الحالي',
        '  ls      - عرض قائمة الملفات',
        '  version - عرض إصدار النظام',
        ''
    ],
    'clear': [],
    'date': [new Date().toString(), ''],
    'version': ['Terminal v1.0.0', ''],
    'ls': [
        'Documents/',
        'Images/',
        'Projects/',
        'system.config',
        'readme.txt',
        ''
    ]
};

function handleTerminalInput(e) {
    if (e.key === 'Enter') {
        const terminalContent = document.getElementById('terminal-content');
        const inputLine = document.createElement('div');
        inputLine.className = 'terminal-line';
        inputLine.textContent = `$ ${terminalInput}`;
        terminalContent.insertBefore(inputLine, document.querySelector('.terminal-input-line'));
        
        // معالجة الأوامر
        if (terminalInput.trim() in terminalCommands) {
            const output = terminalCommands[terminalInput.trim()];
            if (terminalInput.trim() === 'clear') {
                // مسح جميع الأسطر ما عدا سطر الإدخال
                const lines = document.querySelectorAll('.terminal-line:not(.terminal-input-line)');
                lines.forEach(line => line.remove());
            } else {
                output.forEach(line => {
                    const outputLine = document.createElement('div');
                    outputLine.className = 'terminal-line';
                    outputLine.textContent = line;
                    terminalContent.insertBefore(outputLine, document.querySelector('.terminal-input-line'));
                });
            }
        } else if (terminalInput.trim().startsWith('echo ')) {
            const text = terminalInput.substring(5);
            const outputLine = document.createElement('div');
            outputLine.className = 'terminal-line';
            outputLine.textContent = text;
            terminalContent.insertBefore(outputLine, document.querySelector('.terminal-input-line'));
        } else if (terminalInput.trim() !== '') {
            const errorLine = document.createElement('div');
            errorLine.className = 'terminal-line';
            errorLine.textContent = `Command not found: ${terminalInput}`;
            terminalContent.insertBefore(errorLine, document.querySelector('.terminal-input-line'));
        }
        
        // إعادة تعيين الإدخال
        terminalInput = '';
        document.getElementById('terminal-input').textContent = '';
        
        // التمرير لأسفل
        terminalContent.scrollTop = terminalContent.scrollHeight;
    } else if (e.key === 'Backspace') {
        terminalInput = terminalInput.slice(0, -1);
        document.getElementById('terminal-input').textContent = terminalInput;
    } else if (e.key.length === 1) {
        terminalInput += e.key;
        document.getElementById('terminal-input').textContent = terminalInput;
    }
}

// تفعيل الطرفية
document.addEventListener('keydown', handleTerminalInput);

// تحديث الوقت وبيانات النظام بشكل دوري
setInterval(updateTime, 1000);
setInterval(simulateSystemStats, 2000);

// تهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    updateTime();
    simulateSystemStats();
    
    // إضافة تأثير النقر على المفاتيح
    const keys = document.querySelectorAll('.keyboard-key');
    keys.forEach(key => {
        key.addEventListener('click', function() {
            this.style.transform = 'translateY(2px)';
            this.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.4)';
            setTimeout(() => {
                this.style.transform = '';
                this.style.boxShadow = '';
            }, 100);
            
            // محاكاة الكتابة في الطرفية إذا كان المفتاح يحتوي على حرف واحد
            if (this.textContent.length === 1) {
                terminalInput += this.textContent;
                document.getElementById('terminal-input').textContent = terminalInput;
            } else if (this.textContent === '⌫') {
                terminalInput = terminalInput.slice(0, -1);
                document.getElementById('terminal-input').textContent = terminalInput;
            } else if (this.textContent === '↵') {
                handleTerminalInput({ key: 'Enter' });
            } else if (this.textContent === ' ') {
                terminalInput += ' ';
                document.getElementById('terminal-input').textContent = terminalInput;
            }
        });
    });
});
