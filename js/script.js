// script.js
// Tujuan: interaksi sederhana + validasi form
// - Memperbarui greeting di banner menjadi "Hi, <Name>"
// - Validasi input (required, format email, panjang minimal)
// - Menampilkan hasil input di bawah form

// Helper: ambil elemen sekali agar kode lebih rapi
const el = (selector) => document.querySelector(selector);

// Isi tahun otomatis di footer
el('#year').textContent = new Date().getFullYear();

// Referensi elemen yang sering digunakan
const contactForm = el('#contactForm');
const heroName = el('#heroName');

// Referensi field & error text
const nameInput = el('#name');
const emailInput = el('#email');
const phoneInput = el('#phone');
const messageInput = el('#message');

const nameError = el('#nameError');
const emailError = el('#emailError');
const phoneError = el('#phoneError');
const messageError = el('#messageError');

// Area hasil submit
const resultBox = el('#formResult');
const resultName = el('#resultName');
const resultEmail = el('#resultEmail');
const resultPhone = el('#resultPhone');
const resultMessage = el('#resultMessage');

// Validasi sederhana dengan mengembalikan true/false
function validateName(value) {
  // Wajib isi minimal 2 karakter huruf
  if (!value || value.trim().length < 2) {
    return 'Nama minimal 2 karakter';
  }
  return '';
}

function validateEmail(value) {
  // Pola email sederhana, cukup untuk demo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (!value) return 'Email wajib diisi';
  if (!emailRegex.test(value)) return 'Format email tidak valid';
  return '';
}

function validatePhone(value) {
  // Mengizinkan angka dan tanda plus, minimal 9 digit
  const digits = (value || '').replace(/\D/g, '');
  if (!digits) return 'Nomor telepon wajib diisi';
  if (digits.length < 9) return 'Nomor telepon minimal 9 digit';
  return '';
}

function validateMessage(value) {
  if (!value || value.trim().length < 4) {
    return 'Pesan minimal 4 karakter';
  }
  return '';
}

// Utility untuk men-set error text pada field tertentu
function setFieldError(element, errorElement, errorMessage) {
  errorElement.textContent = errorMessage;
  element.setAttribute('aria-invalid', errorMessage ? 'true' : 'false');
}

// Jalankan validasi saat form disubmit
contactForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const nameVal = nameInput.value;
  const emailVal = emailInput.value;
  const phoneVal = phoneInput.value;
  const messageVal = messageInput.value;

  // Validasi setiap field
  const nameErr = validateName(nameVal);
  const emailErr = validateEmail(emailVal);
  const phoneErr = validatePhone(phoneVal);
  const messageErr = validateMessage(messageVal);

  // Tampilkan error ke pengguna
  setFieldError(nameInput, nameError, nameErr);
  setFieldError(emailInput, emailError, emailErr);
  setFieldError(phoneInput, phoneError, phoneErr);
  setFieldError(messageInput, messageError, messageErr);

  // Jika ada error, hentikan proses
  const hasError = !!(nameErr || emailErr || phoneErr || messageErr);
  if (hasError) return;

  // Update greeting di hero
  heroName.textContent = nameVal.trim();

  // Tampilkan hasil input di bawah form
  resultName.textContent = nameVal.trim();
  resultEmail.textContent = emailVal.trim();
  resultPhone.textContent = phoneVal.trim();
  resultMessage.textContent = messageVal.trim();
  resultBox.hidden = false;

  // Scroll halus ke hasil agar terlihat
  resultBox.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Optional: reset form jika ingin kosong lagi
  // contactForm.reset();
});

// Validasi realtime ringan ketika user keluar dari field (blur)
[nameInput, emailInput, phoneInput, messageInput].forEach((input) => {
  input.addEventListener('blur', () => {
    let msg = '';
    if (input === nameInput) msg = validateName(input.value);
    if (input === emailInput) msg = validateEmail(input.value);
    if (input === phoneInput) msg = validatePhone(input.value);
    if (input === messageInput) msg = validateMessage(input.value);
    const errorEl = el(`#${input.id}Error`);
    setFieldError(input, errorEl, msg);
  });
});


