# 📚 School Frontend - Batafsil Tushuntirish

> Bu hujjat React.js da boshlang'ich bo'lgan dasturchilar uchun yozilgan. Loyihani osonroq tushunishingiz uchun har bir qismni batafsil tushuntirib beraman.

---

## 📁 Loyiha Tuzilishi (Papka Strukturasi)

```
frontend/
├── public/              # Statik fayllar (rasmlar, favicon)
├── src/                 # Asosiy kod
│   ├── components/      # Qayta ishlatiluvchi komponentlar
│   ├── pages/           # Sahifalar
│   ├── services/        # API va yordamchi funksiyalar
│   ├── assets/          # Rasmlar, logolar
│   ├── App.jsx          # Asosiy app komponenti
│   ├── main.jsx         # Ilovaning kirish nuqtasi
│   ├── App.css          # Umumiy stillar
│   └── index.css        # Global CSS
├── package.json         # Loyiha sozlamalari va paketlar
├── vite.config.js       # Vite bundler sozlamalari
└── index.html           # HTML fayl
```

---

## 🛠️ Ishlatilgan Texnologiyalar

| Texnologiya | Nima uchun ishlatiladi | O'rganish qiyinligi |
|-------------|------------------------|---------------------|
| **React 19** | UI yaratish uchun | ⭐⭐⭐ |
| **React Router** | Sahifalar orasida navigatsiya | ⭐⭐ |
| **Ant Design** | Tayyor UI komponentlar | ⭐ |
| **Axios** | API so'rovlar | ⭐⭐ |
| **Vite** | Loyihani build qilish | ⭐ |

---

## 🚀 Loyihani Ishga Tushirish

```bash
# 1. Frontend papkasiga o'ting
cd frontend

# 2. Paketlarni o'rnating
npm install

# 3. Loyihani ishga tushiring
npm run dev
```

Loyiha `http://localhost:5173` da ochiladi.

---

## 📝 Asosiy Fayllarni Tushuntirish

### 1. `main.jsx` - Kirish Nuqtasi

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

**Tushuntirish:**
- `createRoot` - React 18+ da ilovani yaratish usuli
- `StrictMode` - Xatolarni oldindan topishga yordam beradi
- `BrowserRouter` - URL bilan navigatsiya qilish uchun kerak
- `App` - Bizning asosiy komponentimiz

---

### 2. `App.jsx` - Asosiy App Komponenti

Bu fayl barcha sahifalarni birlashtiradi va marshrutlashni (routing) boshqaradi.

```jsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
// ... boshqa importlar

function App() {
  return (
    <div className="app">
      <Header />           {/* Yuqori qism - har doim ko'rinadi */}
      <main className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* ... boshqa sahifalar */}
        </Routes>
      </main>
      <Footer />           {/* Pastki qism - har doim ko'rinadi */}
    </div>
  );
}
```

**Tushuntirish:**
- `<Routes>` - Barcha marshrutlarni o'z ichiga oladi
- `<Route path="/" element={...} />` - "/" URL da qaysi sahifa ko'rsatilishini belgilaydi
- `<Header />` va `<Footer />` - Har bir sahifada ko'rinadigan qismlar

---

## 📄 Sahifalar (Pages)

### Sahifalar Ro'yxati

| Fayl nomi | URL | Vazifasi |
|-----------|-----|----------|
| `HomePage.jsx` | `/` | Bosh sahifa |
| `LoginPage.jsx` | `/login` | Tizimga kirish |
| `RegisterPage.jsx` | `/register` | Ro'yxatdan o'tish |
| `Dashboard.jsx` | `/dashboard` | Boshqaruv paneli |
| `BrowseCoursesPage.jsx` | `/browse-courses` | Kurslarni ko'rish |
| `CreateCoursePage.jsx` | `/create-course` | Yangi kurs yaratish |
| `MyAssignmentsPage.jsx` | `/my-assignments` | Mening topshiriqlarim |
| `SubmitAssignmentPage.jsx` | `/submit-assignment/:id` | Topshiriq yuborish |
| `MyGradesPage.jsx` | `/my-grades` | Mening baholarim |
| `CreateAssignmentPage.jsx` | `/create-assignment` | Topshiriq yaratish |
| `ViewSubmissionsPage.jsx` | `/view-submissions` | Yuborilgan ishlarni ko'rish |
| `GradeSubmissionPage.jsx` | `/grade-submission` | Baho qo'yish |
| `ManageCoursesPage.jsx` | - | Kurslarni boshqarish (Admin) |
| `ManageUsersPage.jsx` | - | Foydalanuvchilarni boshqarish (Admin) |
| `ManageAssignmentsPage.jsx` | - | Topshiriqlarni boshqarish (Admin) |

---

### Sahifa Tuzilishi - Misol (LoginPage.jsx)

```jsx
import { useState } from 'react';                    // State uchun
import { useNavigate } from 'react-router-dom';     // Navigatsiya uchun
import { loginUser } from '../services/api';         // API funksiya
import { Form, Input, Button, Card, message } from 'antd';  // UI komponentlar

export default function LoginPage() {
  // 1️⃣ HOOK'lar
  const navigate = useNavigate();           // Boshqa sahifaga o'tish uchun
  const [loading, setLoading] = useState(false);  // Yuklash holati

  // 2️⃣ FORMA YUBORILGANDA
  const handleSubmit = async (values) => {
    setLoading(true);                       // Yuklash boshlandi
    try {
      const data = await loginUser(values.username, values.password);
      localStorage.setItem('token', data.access_token);  // Token saqlash
      message.success('Tizimga kirdingiz!');
      navigate('/dashboard');               // Dashboard'ga o'tish
    } catch (err) {
      message.error(err.message);           // Xato ko'rsatish
    } finally {
      setLoading(false);                    // Yuklash tugadi
    }
  };

  // 3️⃣ JSX - UI QISMI
  return (
    <Card>
      <Form onFinish={handleSubmit}>
        <Form.Item name="username">
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="password">
          <Input.Password placeholder="Parol" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Kirish
        </Button>
      </Form>
    </Card>
  );
}
```

---

## 🧩 Komponentlar (Components)

### `Header.jsx` - Yuqori Qism

```
┌────────────────────────────────────────────────────┐
│  🏫 Online Maktab    [Boshqaruv] [Kurslar] 👤 User │
└────────────────────────────────────────────────────┘
```

**Vazifasi:**
- Logo va sayt nomi ko'rsatish
- Navigatsiya havolalari
- Foydalanuvchi profili va chiqish tugmasi

### `Footer.jsx` - Pastki Qism

```
┌────────────────────────────────────────────────────┐
│          © 2025 Online Maktab. Barcha huquqlar    │
└────────────────────────────────────────────────────┘
```

---

## 🔌 Servislar (Services)

### `api.js` - Backend Bilan Aloqa

Bu fayl backend API bilan bog'lanish uchun barcha funksiyalarni o'z ichiga oladi.

```javascript
// API manzili
export const API_URL = 'http://localhost:8000';

// Token olish funksiyasi
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// 📝 RO'YXATDAN O'TISH
export async function registerUser(data) {
  const res = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

// 🔐 TIZIMGA KIRISH
export async function loginUser(username, password) {
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  const res = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData,
  });
  return res.json();
}

// 👤 JORIY FOYDALANUVCHI
export async function getCurrentUser() {
  const res = await fetch(`${API_URL}/users/me`, {
    headers: getAuthHeaders(),
  });
  return res.json();
}

// 📚 KURSLARNI OLISH
export async function getCourses() {
  const res = await fetch(`${API_URL}/courses/`, {
    headers: getAuthHeaders(),
  });
  return res.json();
}

// ➕ YANGI KURS YARATISH
export async function createCourse(data) {
  const res = await fetch(`${API_URL}/courses/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

// 📝 KURSGA YOZILISH
export async function enrollInCourse(studentId, courseId) {
  const res = await fetch(`${API_URL}/enrollments/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ student_id: studentId, course_id: courseId }),
  });
  return res.json();
}
```

---

### `ProtectedRoute.jsx` - Himoyalangan Marshrutlar

```jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Agar token yo'q bo'lsa - login sahifasiga yo'naltir
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Token bor - sahifani ko'rsat
  return children;
};
```

**Ishlatilishi:**
```jsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>      {/* Himoya qatlami */}
      <Dashboard />       {/* Himoyalangan sahifa */}
    </ProtectedRoute>
  }
/>
```

---

## 🎨 Ant Design Komponentlari

Loyihada ishlatilgan asosiy UI komponentlar:

| Komponent | Vazifasi | Misol |
|-----------|----------|-------|
| `Button` | Tugma | `<Button type="primary">Yuborish</Button>` |
| `Input` | Matn kiritish | `<Input placeholder="Ism" />` |
| `Form` | Forma | `<Form onFinish={handleSubmit}>...</Form>` |
| `Card` | Karta | `<Card title="Kurs">...</Card>` |
| `Table` | Jadval | `<Table columns={...} dataSource={...} />` |
| `message` | Xabar | `message.success('Muvaffaqiyat!')` |
| `Spin` | Yuklanish | `<Spin size="large" />` |
| `Tag` | Yorliq | `<Tag color="blue">O'quvchi</Tag>` |
| `Modal` | Modal oyna | `<Modal open={true}>...</Modal>` |
| `Space` | Bo'sh joy | `<Space size="large">...</Space>` |
| `Row, Col` | Grid | `<Row><Col span={12}>...</Col></Row>` |

---

## 🔑 Muhim React Tushunchalari

### 1. State (Holat)

```jsx
const [name, setName] = useState('');  // Boshlang'ich qiymat: ''

// O'zgartirish
setName('Ali');  // Endi name = 'Ali'
```

### 2. useEffect (Hayot Sikli)

```jsx
useEffect(() => {
  // Komponent yuklanganda ishlaydi
  loadData();
}, []);  // [] - faqat bir marta ishlaydi

useEffect(() => {
  // searchTerm o'zgarganda ishlaydi
  filterResults();
}, [searchTerm]);
```

### 3. Props (Xususiyatlar)

```jsx
// Yuborish
<Button type="primary" loading={true}>Yuborish</Button>

// Qabul qilish (komponent ichida)
function Button({ type, loading, children }) {
  // type = "primary"
  // loading = true
  // children = "Yuborish"
}
```

### 4. Event Handler (Hodisa Boshqaruvchisi)

```jsx
const handleClick = () => {
  console.log('Bosildi!');
};

<Button onClick={handleClick}>Bosing</Button>
```

---

## 🔄 Ma'lumotlar Oqimi

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                             │
│                                                             │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐                 │
│  │  Sahifa │───>│   API   │───>│ Backend │                 │
│  │  (Page) │<───│ Service │<───│  Server │                 │
│  └─────────┘    └─────────┘    └─────────┘                 │
│       │              │                                      │
│       v              v                                      │
│  ┌─────────┐    ┌─────────┐                                 │
│  │  State  │    │ localStorage│ (Token saqlash)            │
│  └─────────┘    └─────────┘                                 │
│       │                                                     │
│       v                                                     │
│  ┌─────────────────────────────────────────┐               │
│  │              UI KOMPONENTLAR             │               │
│  │    (Header, Card, Button, Input...)      │               │
│  └─────────────────────────────────────────┘               │
└─────────────────────────────────────────────────────────────┘
```

---

## 👥 Foydalanuvchi Rollari

| Rol | Ruxsatlar |
|-----|-----------|
| **Student** (O'quvchi) | Kurslarga yozilish, topshiriqlarni ko'rish va yuborish, baholarni ko'rish |
| **Teacher** (O'qituvchi) | Kurs yaratish, topshiriq berish, baho qo'yish |
| **Admin** | Barcha huquqlar + foydalanuvchilarni boshqarish |

---

## 📱 Sahifalar Bo'yicha Tushuntirish

### 🏠 HomePage (Bosh Sahifa)
- Sayt haqida umumiy ma'lumot
- "Boshlash" va "Ro'yxatdan o'tish" tugmalari
- Statistika (o'quvchilar soni, kurslar soni va h.k.)

### 🔐 LoginPage (Kirish)
- Email va parol kiritish
- Token olish va localStorage'ga saqlash
- Dashboard'ga yo'naltirish

### 📝 RegisterPage (Ro'yxatdan O'tish)
- Ism, email, parol kiritish
- Yangi foydalanuvchi yaratish
- Login sahifasiga yo'naltirish

### 📊 Dashboard (Boshqaruv Paneli)
- Foydalanuvchi ma'lumotlari
- Rolga qarab turli statistikalar
- Tezkor havolalar

### 📚 BrowseCoursesPage (Kurslarni Ko'rish)
- Barcha mavjud kurslar ro'yxati
- Qidiruv imkoniyati
- Kursga yozilish tugmasi

### 📋 MyAssignmentsPage (Mening Topshiriqlarim)
- O'quvchi uchun berilgan topshiriqlar
- Muddat va holat ko'rsatish
- Topshiriq yuborish havolasi

### 📤 SubmitAssignmentPage (Topshiriq Yuborish)
- Matn kiritish
- Fayl yuklash
- Yuborish tugmasi

### 📈 MyGradesPage (Mening Baholarim)
- Barcha baholar ro'yxati
- Kurs va topshiriq bo'yicha baholar

---

## 💡 Foydali Maslahatlar

### 1. Console.log Bilan Debug Qilish
```jsx
console.log('Ma\'lumotlar:', data);  // Brauzer konsolida ko'ring
```

### 2. React Developer Tools
Chrome uchun "React Developer Tools" kengaytmasini o'rnating. Bu sizga komponentlarni ko'rish va debug qilishda yordam beradi.

### 3. Xatolarni Tekshirish
```jsx
try {
  const data = await loginUser(email, password);
} catch (error) {
  console.error('Xato:', error);
  message.error(error.message);
}
```

### 4. Network Tab
Chrome DevTools > Network tabda API so'rovlarini ko'rishingiz mumkin.

---

## 🔧 Kodni O'zgartirish

### Yangi Sahifa Qo'shish

1. `src/pages/` papkasida yangi fayl yarating:
```jsx
// NewPage.jsx
export default function NewPage() {
  return <div>Yangi Sahifa</div>;
}
```

2. `App.jsx` da import qiling va Route qo'shing:
```jsx
import NewPage from './pages/NewPage';

<Route path="/new-page" element={<NewPage />} />
```

### Yangi Komponent Qo'shish

1. `src/components/` papkasida yangi fayl yarating:
```jsx
// MyButton.jsx
export default function MyButton({ children, onClick }) {
  return (
    <button onClick={onClick} style={{ padding: '10px 20px' }}>
      {children}
    </button>
  );
}
```

2. Istalgan joyda ishlatish:
```jsx
import MyButton from '../components/MyButton';

<MyButton onClick={() => alert('Bosildi!')}>
  Meni bosing
</MyButton>
```

---

## ❓ Ko'p So'raladigan Savollar

### Q: Token nima va u nima uchun kerak?
**A:** Token - bu sizning "kirish kartangiz". Tizimga kirgandan so'ng backend sizga token beradi. Keyin har bir so'rovda shu tokenni yuborasiz va backend sizni taniydi.

### Q: `async/await` nima?
**A:** Bu asinxron kod yozish usuli. `await` - natija kelguncha kutish degani.
```jsx
const data = await getCourses();  // Kurslar kelguncha kut
console.log(data);                // Keyin ishlat
```

### Q: `useState` va `useEffect` farqi nima?
**A:** 
- `useState` - ma'lumotlarni saqlash va o'zgartirish uchun
- `useEffect` - komponent yuklanganida yoki ma'lumot o'zgarganda biror narsa qilish uchun

### Q: `.map()` nima qiladi?
**A:** Array elementlari ustida aylanib, har biridan yangi narsa yaratadi:
```jsx
{courses.map(course => (
  <Card key={course.id}>{course.title}</Card>
))}
```

---

## 📚 Qo'shimcha Resurslar

- [React Rasmiy Hujjatlar](https://react.dev)
- [Ant Design Hujjatlar](https://ant.design)
- [React Router Hujjatlar](https://reactrouter.com)
- [Vite Hujjatlar](https://vitejs.dev)

---

## 🎯 Xulosa

Bu loyiha quyidagi asosiy konsepsiyalarni o'z ichiga oladi:

1. **Komponent asosidagi arxitektura** - UI kichik qismlarga bo'lingan
2. **Client-side routing** - Sahifalar o'rtasida navigatsiya
3. **API integratsiya** - Backend bilan aloqa
4. **Autentifikatsiya** - Token asosida foydalanuvchi tekshirish
5. **State boshqaruvi** - Ma'lumotlarni saqlash va yangilash

Loyihani o'rganishda sabrli bo'ling va har bir qismni alohida tushunishga harakat qiling! 🚀

---

*Yaratildi: 2025-yil*

