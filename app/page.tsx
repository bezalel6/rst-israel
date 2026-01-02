"use client";
import React, { useState, useEffect } from "react";
import {
  Zap,
  Ruler,
  ShieldCheck,
  Phone,
  Menu,
  X,
  CheckCircle2,
  Settings,
  ArrowLeft,
  ThermometerSun,
  Bot,
  Gauge,
  UserCheck,
  MapPin,
  Mail,
  Printer,
} from "lucide-react";

// --- Components ---

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyle =
    "px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 transform active:scale-95";
  const variants = {
    primary:
      "bg-cyan-600 text-white hover:bg-cyan-700 shadow-lg hover:shadow-cyan-500/30",
    secondary:
      "bg-white text-slate-800 border border-slate-200 hover:border-cyan-500 hover:text-cyan-600",
    outline:
      "bg-transparent border-2 border-white text-white hover:bg-white/10",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle, centered = true }) => (
  <div className={`mb-12 ${centered ? "text-center" : "text-right"}`}>
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
      {title}
    </h2>
    <div
      className={`h-1.5 w-20 bg-cyan-500 rounded-full mb-6 ${
        centered ? "mx-auto" : "ml-auto"
      }`}
    ></div>
    {subtitle && (
      <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);

const Card = ({ icon: Icon, title, description, features = [] }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col">
    <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-600 transition-colors duration-300">
      <Icon className="w-6 h-6 text-cyan-600 group-hover:text-white transition-colors duration-300" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 mb-6 flex-grow leading-relaxed text-sm">
      {description}
    </p>
    {features.length > 0 && (
      <ul className="space-y-2 mt-auto pt-4 border-t border-slate-100">
        {features.map((item, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2 text-sm text-slate-700"
          >
            <CheckCircle2 className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

// --- Main App Component ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle Scroll Effect for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="font-sans text-slate-800 bg-slate-50 min-h-screen"
    >
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo Section */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo(0, 0)}
          >
            {/* Trying to load logo from the Theme path provided. 
                Fallback to local/uploaded logo if not found.
             */}
            <img
              src="https://www.rstisrael.com/wp-content/themes/Netbuy/images/logo.png"
              alt="RST Israel Logo"
              className="h-16 w-auto object-contain"
              onError={(e) => {
                // Fallback 1: Try local logo.png if the Netbuy path fails
                const target = e.currentTarget;
                if (target.src.includes("Netbuy")) {
                  target.src = "/logo.png";
                } else {
                  // Fallback 2: Hide image, show text
                  target.style.display = "none";
                  if (target.nextSibling)
                    target.nextSibling.style.display = "block";
                }
              }}
            />
            {/* Fallback Text Logo */}
            <div className="hidden">
              <span
                className={`text-2xl font-bold tracking-tighter ${
                  isScrolled ? "text-cyan-600" : "text-white"
                }`}
              >
                RST
              </span>
              <span
                className={`text-2xl font-bold tracking-tighter ${
                  isScrolled ? "text-slate-800" : "text-white"
                }`}
              >
                ISRAEL
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div
            className={`hidden md:flex items-center gap-8 font-medium ${
              isScrolled ? "text-slate-700" : "text-white/90"
            }`}
          >
            <button
              onClick={() => scrollToSection("services")}
              className="hover:text-cyan-500 transition-colors"
            >
              שירותים
            </button>
            <button
              onClick={() => scrollToSection("tech")}
              className="hover:text-cyan-500 transition-colors"
            >
              טכנולוגיה
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-cyan-500 transition-colors"
            >
              אודות
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-cyan-500 transition-colors"
            >
              צור קשר
            </button>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              variant={isScrolled ? "primary" : "secondary"}
              onClick={() => scrollToSection("contact")}
            >
              <Phone className="w-4 h-4" />
              02-9709998
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-cyan-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-8 h-8" />
            ) : (
              <Menu
                className={`w-8 h-8 ${
                  isScrolled ? "text-slate-800" : "text-white"
                }`}
              />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100">
            <div className="flex flex-col p-4 gap-4 text-center">
              <button
                onClick={() => scrollToSection("services")}
                className="py-2 text-slate-700 font-medium border-b border-slate-50"
              >
                שירותים
              </button>
              <button
                onClick={() => scrollToSection("tech")}
                className="py-2 text-slate-700 font-medium border-b border-slate-50"
              >
                טכנולוגיה
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="py-2 text-slate-700 font-medium border-b border-slate-50"
              >
                אודות
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="py-2 text-cyan-600 font-bold"
              >
                צור קשר
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://www.rstisrael.com/wp-content/uploads/home.jpg"
            onError={(e) => {
              // Fallback to stock if original fails
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1576013551627-0cc20b468808?q=80&w=2074&auto=format&fit=crop";
            }}
            alt="Luxury Swimming Pool"
            className="w-full h-full object-cover animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-900/90"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-12">
          <div className="inline-block px-4 py-1.5 bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full text-cyan-300 text-sm font-semibold mb-6 animate-fade-in-up">
            אר.אס.טי - המומחים לבריכות שחייה
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            שירות לבריכות שחיה, תכנון והקמה
            <br />
            {/* <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
              השקט הנפשי שלנו.
            </span> */}
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            הפתרון המלא לבריכה שלכם: מתכנון הנדסי מוקפד, דרך מערכות יוניזציה
            ירוקות, ועד לשירות טכני ע"י מומחים מוסמכים.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => scrollToSection("tech")}>
              <Zap className="w-5 h-5" />
              המהפכה הירוקה
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection("services")}
            >
              לכל השירותים
            </Button>
          </div>
        </div>
      </header>

      {/* Stats / Trust Bar */}
      <div className="bg-white py-10 shadow-sm border-b border-slate-100 relative z-20 -mt-10 mx-4 md:mx-auto max-w-6xl rounded-2xl flex flex-wrap justify-around gap-8">
        <div className="text-center">
          <p className="text-3xl font-bold text-slate-800">100%</p>
          <p className="text-sm text-slate-500">ללא ריח כלור</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-slate-800">20+</p>
          <p className="text-sm text-slate-500">שנות ניסיון</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-slate-800">ISO</p>
          <p className="text-sm text-slate-500">תקני משרד הבריאות</p>
        </div>
      </div>

      {/* Services Grid Section */}
      <section
        id="services"
        className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <SectionHeading
          title="פתרונות מקיפים תחת קורת גג אחת"
          subtitle="אנחנו לא רק מוכרים ציוד, אנחנו מספקים פתרונות הנדסיים מקיפים לתחזוקה, תפעול ובטיחות הבריכה שלכם."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            icon={Ruler}
            title="תכנון והקמה"
            description="תכנון בריכות ציבוריות ופרטיות בהתאם לדרישות משרד הבריאות והתקנים הישראלים. ליווי משלב הקונספט ועד השחייה הראשונה."
            features={[
              "תכנון הנדסי וקונסטרוקציה",
              "עבודות בטון וצנרת",
              "פיקוח על הביצוע",
            ]}
          />
          <Card
            icon={Zap}
            title="חיטוי ירוק (יוניזציה)"
            description="מערכות חיטוי מתקדמות בטכנולוגיית יוניזציה (נחושת וכסף). מים צלולים ללא שימוש אגרסיבי בכלור, מלח או כימיקלים."
            features={[
              "ללא צריבה בעיניים",
              "מים באיכות שתייה",
              "חיסכון בעלויות תפעול",
            ]}
          />
          <Card
            icon={Gauge}
            title="מערכות בקרה ואוטומציה"
            description="פתרונות חכמים לניטור ואיזון הבריכה: בקרי כימיקלים, מדי עכירות, בקרי גובה מפלס ובקרת ספיקה."
            features={[
              "אוגרי נתונים מובנים",
              "חיישנים מתקדמים",
              "התראות בזמן אמת",
            ]}
          />
          <Card
            icon={ThermometerSun}
            title="חימום ואנרגיה"
            description="פתרונות חימום מתקדמים להארכת עונת הרחצה: משאבות חום, חימום סולארי וכיסויים תרמיים צפים לשמירת החום."
            features={["משאבות חום חסכוניות", "כיסויים צפים", "חיסכון בחשמל"]}
          />
          <Card
            icon={Bot}
            title="ציוד ורובוטים"
            description="יבוא ושיווק של הציוד המתקדם בעולם: רובוטים לניקוי, משאבות סחרור, מסננים, ותאורת לד תת-מימית מעוצבת."
            features={[
              "רובוטים לניקוי קרקעית",
              "תאורת LED צבעונית",
              "משאבות מינון SEKO/Etatron",
            ]}
          />
          <Card
            icon={ShieldCheck}
            title="שירות ובדיקות תקינות"
            description="שירות טכני מקצועי ובדיקות בטיחות תקופתיות. מתן אישור תקינות מערכות חתום ע”י טכנאי חשמלאי מוסמך."
            features={[
              "אישור חשמלאי מוסמך",
              "בדיקת הארקות ובטיחות",
              "שירות טכני 24/7",
            ]}
          />
        </div>
      </section>

      {/* Tech Spotlight Section (Dark/Contrasting) */}
      <section
        id="tech"
        className="py-24 bg-slate-900 text-white relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-900/50 border border-cyan-700 rounded-full text-cyan-400 text-sm font-semibold mb-6">
                <Zap className="w-4 h-4" />
                יוניזציית נחושת וכסף
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                מים צלולים ובריאים <br />
                <span className="text-cyan-400">ללא כימיקלים ורעלים.</span>
              </h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                טכנולוגיית יוניזציה (Ionization) משתמשת ביוני נחושת וכסף כדי
                לנטרל בקטריות, אצות וחיידקים (כולל לגיונלה) ביעילות של 100%.
                המערכת הופכת את המים לרכים, נעימים ובטוחים, ללא הריח והצריבה
                המוכרים של הכלור.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "יעילות של 100% בחיסול חיידקים",
                  "מתאים גם למי שתייה (לפי התקן)",
                  "מערכת יציבה שאינה מושפעת מחום",
                  "הגנה אקטיבית בפני קורוזיה בצנרת",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-slate-200">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 group bg-white/5 p-4">
                {/* Specific Device Image from Uploads */}
                <img
                  src="https://www.rstisrael.com/wp-content/uploads/NEC-20.png"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1563299796-b729d0af54a5?q=80&w=1925&auto=format&fit=crop";
                  }}
                  alt="NEC-20 Ionization System"
                  className="w-full object-contain transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent flex items-end p-8 pointer-events-none">
                  <div>
                    <p className="text-cyan-400 font-bold tracking-wider text-sm uppercase mb-1">
                      טכנולוגיית העתיד
                    </p>
                    <p className="text-white text-xl font-bold">
                      פתרון מושלם מ-3 ועד 3000 קוב מים
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-cyan-100 rounded-full -z-10"></div>
              {/* Authentic Project Image */}
              <img
                src="https://www.rstisrael.com/wp-content/uploads/IMG_2198.jpg"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop";
                }}
                alt="RST Project Construction"
                className="rounded-2xl shadow-lg w-full object-cover h-[400px]"
              />
              <div className="absolute bottom-6 right-6 bg-white p-4 rounded-xl shadow-lg border-r-4 border-cyan-500">
                <p className="text-3xl font-bold text-slate-900">20+</p>
                <p className="text-sm text-slate-600">שנות ניסיון</p>
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-cyan-600 font-bold uppercase tracking-wider mb-2">
                אודות החברה
              </h3>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                אר.אס.טי - מומחים בבנייה ואספקת ציוד
              </h2>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                החברה נוסדה על ידי <strong>רומן טשימוב</strong>, מומחה בעל וותק
                של למעלה מ-20 שנה. אר.אס.טי מתמחה בתכנון וביצוע עבודות בנייה,
                אספקת כימיקלים ושרות בריכות בע"מ.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                אנו מתמחים במתן פתרונות כוללים למגזר הפרטי והציבורי: החל משלב
                התכנון ההנדסי, דרך הקמת המערכות ועד לאספקת כימיקלים ושירות שוטף.
                בין לקוחותינו: רשתות בתי מלון, קיבוצים, מתנ"סים ומרכזי ספורט.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-slate-700 font-medium bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100">
                  <UserCheck className="w-5 h-5 text-cyan-500" />
                  צוות מיומן
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-medium bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100">
                  <Settings className="w-5 h-5 text-cyan-500" />
                  יבואני ציוד
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">צור קשר</h2>
            <p className="text-lg text-slate-600 mb-8">
              זקוקים לייעוץ? יש לכם תקלה? מעוניינים בהצעת מחיר למערכת יוניזציה?
              השאירו פרטים ונחזור אליכם בהקדם.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">טלפון משרד</p>
                  <p className="text-xl font-bold text-slate-900 dir-ltr text-right">
                    02-9709998
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                  <Printer className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">פקס</p>
                  <p className="text-xl font-bold text-slate-900 dir-ltr text-right">
                    02-9974717
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">דואר אלקטרוני</p>
                  <p className="text-lg font-medium text-slate-900">
                    rst@rstisrael.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">כתובת</p>
                  <p className="text-lg font-medium text-slate-900">
                    א.ת. עפרה, מיקוד 9062700
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    שם מלא
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    טלפון
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  נושא הפנייה
                </label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all bg-white text-slate-700">
                  <option>ייעוץ לתכנון והקמה</option>
                  <option>הזמנת שירות טכני / בדיקה</option>
                  <option>מתעניין במערכת חיטוי ירוקה</option>
                  <option>רכישת ציוד / כימיקלים</option>
                  <option>אחר</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  הודעה
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                ></textarea>
              </div>

              <Button className="w-full justify-center">
                שלח פנייה
                <ArrowLeft className="w-4 h-4 mr-2" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-white mb-4">
              {/* Footer Logo */}
              <img
                src="https://www.rstisrael.com/wp-content/themes/Netbuy/images/logo.png"
                alt="RST Logo"
                className="h-10 mb-2 object-contain bg-white/10 rounded p-1"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.includes("Netbuy")) {
                    target.src = "/logo.png";
                  } else {
                    target.style.display = "none";
                  }
                }}
              />
              <h3 className="text-xl font-bold text-white mb-1">
                אר.אס.טי ישראל
              </h3>
            </div>
            <p className="max-w-sm mb-4 text-sm leading-relaxed">
              פתרונות מתקדמים בבריכות שחייה. יבואנים בלעדיים של מערכות בקרה
              ומכשור מתקדם. שירות מקצועי ואמין למגזר הפרטי והציבורי.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">ניווט מהיר</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="hover:text-cyan-400 transition-colors"
                >
                  שירותים ומוצרים
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("tech")}
                  className="hover:text-cyan-400 transition-colors"
                >
                  טכנולוגיה ירוקה
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="hover:text-cyan-400 transition-colors"
                >
                  אודות החברה
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="hover:text-cyan-400 transition-colors"
                >
                  צור קשר
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">פרטי התקשרות</h4>
            <ul className="space-y-2 text-sm">
              <li>א.ת. עפרה, מיקוד 9062700</li>
              <li>טל: 02-9709998</li>
              <li>פקס: 02-9974717</li>
              <li>rst@rstisrael.com</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-center text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>
            © {new Date().getFullYear()} RST Israel - רומן טשימוב. כל הזכויות
            שמורות.
          </p>
          <div className="flex gap-4 items-center">
            <span className="text-slate-500">נבנה ע"י</span>
            <span className="font-bold text-cyan-500">B.A. אתרים</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
