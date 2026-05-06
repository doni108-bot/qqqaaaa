# 📚 Wiki — QQQAAAA

> التوثيق الرسمي للمشروع | [GitHub Wiki](https://github.com/doni108-bot/qqqaaaa/wiki)

---

## 🗂 الفهرس

1. [نظرة عامة](#نظرة-عامة)
2. [البدء السريع](#البدء-السريع)
3. [دعم الجوالات والمتصفحات](#دعم-الجوالات-والمتصفحات)
4. [الأتمتة (GitHub Actions)](#الأتمتة-github-actions)
5. [هيكل الملفات](#هيكل-الملفات)
6. [الأمان](#الأمان)
7. [المساهمة](#المساهمة)

---

## نظرة عامة

**QQQAAAA** مشروع مفتوح المصدر يهدف إلى توفير نقطة انطلاق منظمة وآلية تحتوي على:

- صفحة ويب متجاوبة تعمل على الجوالات والمتصفحات
- أتمتة كاملة عبر GitHub Actions
- توثيق مركزي عبر Wiki وملفات `docs/`

---

## البدء السريع

```bash
# استنساخ المستودع
git clone https://github.com/doni108-bot/qqqaaaa.git
cd qqqaaaa

# فتح الصفحة محلياً
open index.html
# أو استخدم خادم بسيط
npx serve .
```

---

## دعم الجوالات والمتصفحات

الصفحة الرئيسية (`index.html`) تدعم:

| المتصفح / الجهاز | الدعم |
|---|---|
| Chrome (Android / Desktop) | ✅ |
| Safari (iOS / macOS) | ✅ |
| Firefox | ✅ |
| Samsung Internet | ✅ |
| Edge | ✅ |
| Opera Mini | ✅ |

### تقنيات الدعم المستخدمة

- `<meta name="viewport">` — ضبط العرض للجوال
- `<meta name="theme-color">` — لون شريط الجوال
- `<meta name="apple-mobile-web-app-capable">` — دعم iOS
- تصميم **Mobile-First** بـ CSS Flexbox + Grid
- قائمة Hamburger للشاشات الصغيرة
- `clamp()` للخطوط المتجاوبة

---

## الأتمتة (GitHub Actions)

يتضمن المشروع Workflow يعمل تلقائياً:

| الحدث | الإجراء |
|---|---|
| Push إلى `main` | نشر الصفحة على GitHub Pages |
| Pull Request | فحص صحة الملفات |
| يدوي (`workflow_dispatch`) | نشر يدوي عند الطلب |

---

## هيكل الملفات

```
qqqaaaa/
├── index.html          ← الصفحة الرئيسية (متجاوبة)
├── docs/
│   └── wiki.md         ← هذا الملف (التوثيق)
├── .github/
│   ├── workflows/
│   │   └── pages.yml   ← أتمتة GitHub Pages
│   └── ISSUE_TEMPLATE/
│       └── custom.md
├── .gitignore
├── LICENSE
└── README.md
```

---

## الأمان

- راجع **Settings → Collaborators** لإزالة أي وصول غير مرغوب
- فعّل **Dependabot Alerts** من Settings → Security
- راجع **Settings → Deploy keys** بانتظام
- تحقق من **Audit Log** في إعدادات المنظمة

---

## المساهمة

1. Fork المستودع
2. أنشئ فرع جديد: `git checkout -b feature/اسم-الميزة`
3. أجرِ تغييراتك وأضف commit وصفي
4. افتح Pull Request

---

*آخر تحديث: 2026 · [GitHub](https://github.com/doni108-bot/qqqaaaa)*
