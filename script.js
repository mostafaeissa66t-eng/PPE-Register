// =================================================================
// تم وضع الرابط الجديد الخاص بك هنا
const API_URL = 'https://script.google.com/macros/s/AKfycbxvfsj8_Y7sQT_hsEyXVsBqgzyJ5r58PFhQSIwx_tMnGzWbq3e-9TnpRuMD0-mAnhgMog/exec';
// =================================================================

// 🔑 تأكد أن هذا المفتاح السري هو نفس المفتاح الموجود في كود Apps Script
const SECRET_KEY = "MySecretSheetKey_2025!#";

const form = document.getElementById('ppe-form');
const submitBtn = document.getElementById('submit-btn');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // منع التحديث التلقائي للصفحة

    // 1. تعطيل الزر وإظهار رسالة "جاري الإرسال"
    submitBtn.disabled = true;
    submitBtn.textContent = 'جاري الإرسال...';
    messageDiv.className = 'message';
    messageDiv.textContent = '';

    // 2. تجميع البيانات من الفورم (لن يتم إرسال ID لأنه غير موجود)
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // 3. إضافة المفتاح السري إلى البيانات
    data.secret = SECRET_KEY;

    // 4. إرسال البيانات إلى الـ API
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // 5. عرض رسالة النجاح
        messageDiv.className = 'message success';
        messageDiv.textContent = 'تم تسجيل البيانات بنجاح!'; // الرسالة القادمة من السيرفر لن تظهر هنا بسبب no-cors
        form.reset(); // إفراغ الفورم

    } catch (error) {
        // 6. عرض رسالة الخطأ
        messageDiv.className = 'message error';
        messageDiv.textContent = 'حدث خطأ أثناء الإرسال. الرجاء المحاولة مرة أخرى.';
        console.error('Error:', error);
    } finally {
        // 7. إعادة تفعيل الزر
        submitBtn.disabled = false;
        submitBtn.textContent = 'إرسال البيانات';
    }
});
