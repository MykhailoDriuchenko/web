// ЗАВДАННЯ 1

function countLetter(str, letter) {
    let count = 0;
    letter = letter.toLowerCase();

    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i).toLowerCase() === letter) {
            count++;
        }
    }
    return count;
}

function getRow(firstRow, secondRow, letter = 'a') {
    const count1 = countLetter(firstRow, letter);
    const count2 = countLetter(secondRow, letter);

    return count1 > count2 ? firstRow : secondRow;
}

function runTask1() {
    const first = prompt("Введіть перший рядок:", "Slow and steady wins the race");
    const second = prompt("Введіть другий рядок:", "You can say that again");
    const letter = prompt("Яку літеру порахувати?", "a");

    const result = getRow(first, second, letter);
    alert("Рядок з більшою кількістю '" + letter + "':\n" + result);
}

// ЗАВДАННЯ 2

function normalizePhone(phone) {
    let p = phone.replace(/\D/g, "");

    if (p.length === 12 && p.startsWith("380")) return p;
    if (p.length === 11 && p.startsWith("80")) return "3" + p;
    if (p.length === 10 && p.startsWith("0")) return "38" + p;

    return null;
}

function formattedPhone(phone) {
    const normalized = normalizePhone(phone);

    if (!normalized) {
        return "Неправильний формат номера!";
    }

    const country = "+" + normalized.substring(0, 2);
    const code = normalized.substring(2, 5);
    const first3 = normalized.substring(5, 8);
    const last4_1 = normalized.substring(8, 10);
    const last4_2 = normalized.substring(10, 12);

    return `${country} (${code}) ${first3}-${last4_1}-${last4_2}`;
}

function runTask2() {
    const phone = prompt("Введіть номер телефону (+380..., 380..., 80..., 0...):");
    alert(formattedPhone(phone));
}

// Підключення кнопок

document.getElementById("task1Btn").onclick = runTask1;
document.getElementById("task2Btn").onclick = runTask2;
