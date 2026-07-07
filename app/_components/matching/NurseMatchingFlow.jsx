"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Home,
  Hospital,
  Building2,
  HelpCircle,
  Eye,
  Activity,
  Stethoscope,
  Moon,
  UserRound,
  Bandage,
  Syringe,
  Clock,
  CalendarDays,
  CalendarClock,
  MessageSquare,
  Loader2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import Container from "../ui/Container";
import { FloatingInput } from "../ui/Input";
import Button from "../ui/Button";
import { track } from "../../lib/analytics";

const ease = [0.22, 1, 0.36, 1];

const LOCATION_OPTIONS = [
  { value: "בבית", icon: Home },
  { value: "בבית חולים", icon: Hospital },
  { value: "בדיור מוגן / מוסד", icon: Building2 },
  { value: "אחר", icon: HelpCircle },
];

const HELP_OPTIONS = [
  { value: "השגחה פרטית", icon: Eye },
  { value: "טיפול לאחר ניתוח", icon: Activity },
  { value: "טיפול רפואי בבית", icon: Stethoscope },
  { value: "אחות ללילה", icon: Moon },
  { value: "טיפול בקשיש", icon: UserRound },
  { value: "טיפול בפצעים / חבישות", icon: Bandage },
  { value: "זריקות / עירוי / טיפול רפואי", icon: Syringe },
  { value: "אחר / לא בטוחים", icon: HelpCircle },
];

const TIMING_OPTIONS = [
  { value: "מיידית", icon: Clock },
  { value: "היום", icon: CalendarClock },
  { value: "בימים הקרובים", icon: CalendarDays },
  { value: "בשבועות הקרובים", icon: CalendarDays },
  { value: "רק מתייעצים כרגע", icon: MessageSquare },
];

const TOTAL_STEPS = 5;

/** Maps the intake location to the lead API's required serviceType enum. */
function toServiceType(location) {
  return location === "בבית חולים" ? "בית חולים" : "בית";
}

export default function NurseMatchingFlow() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    location: "",
    help: "",
    timing: "",
    city: "",
    name: "",
    phone: "",
  });
  const [status, setStatus] = useState({ state: "idle" });
  const startedRef = useRef(false);

  function markStarted() {
    if (!startedRef.current) {
      startedRef.current = true;
      track("matching_form_start");
    }
  }

  function choose(field, value, nextStep) {
    markStarted();
    setAnswers((a) => ({ ...a, [field]: value }));
    track("matching_step_complete", { step: nextStep - 1, field, value });
    setStep(nextStep);
  }

  function goBack() {
    setStep((s) => Math.max(1, s - 1));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (status.state === "loading") return;

    const name = answers.name.trim();
    const phone = answers.phone.trim();
    if (!name || !phone) {
      setStatus({ state: "err", message: "נא למלא שם וטלפון" });
      return;
    }

    setStatus({ state: "loading" });
    const city = answers.city.trim();
    const careLocation = answers.location || "לא צוין";
    const help = answers.help || "לא צוין";
    const urgency = answers.timing || "לא צוין";
    const payload = {
      name,
      phone,
      city,
      serviceType: toServiceType(answers.location),
      service: help,
      // Discrete fields so the sales rep sees each answer clearly in GHL.
      careLocation,
      urgency,
      // Human-readable summary as a fallback for any GHL view.
      message: `פנייה מטופס התאמת אחות\nמיקום הטיפול: ${careLocation}\nסוג העזרה: ${help}\nמועד נדרש: ${urgency}\nאזור: ${city}`,
      page: "home",
      source: "nurse-matching",
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.error || "שליחה נכשלה. נסו שוב בעוד רגע.");
      track("matching_form_submit", { location: answers.location, help: answers.help });
      setStatus({ state: "ok" });
    } catch (err) {
      setStatus({ state: "err", message: err?.message || "שליחה נכשלה. נסו שוב בעוד רגע." });
    }
  }

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: 24 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -24 },
        transition: { duration: 0.28, ease },
      };

  return (
    <section id="matching" className="relative scroll-mt-nav overflow-hidden py-16 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white via-[#f4f8ff] to-white"
      />
      <Container size="wide">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#1851d8] ring-1 ring-blue-100/80">
            <Stethoscope className="h-3.5 w-3.5" strokeWidth={2.4} />
            התאמת אחות אישית
          </p>
          <h2 className="mt-5 text-balance text-[28px] font-extrabold leading-[1.12] tracking-tight text-[#0a1f44] sm:text-[36px]">
            בואו נמצא את האחות המתאימה לצורך שלכם
          </h2>
          <p className="mt-4 text-pretty text-[15.5px] leading-[1.7] text-slate-600 sm:text-[16.5px]">
            ענו על מספר שאלות קצרות ונציג יחזור אליכם להתאמה אישית.
          </p>
        </div>

        <div className="mx-auto mt-9 max-w-2xl">
          <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_30px_80px_-30px_rgba(10,31,68,0.28)]">
            {status.state !== "ok" ? (
              <div className="border-b border-slate-100 px-5 pt-5 sm:px-7">
                <div className="flex items-center justify-between text-[12px] font-bold text-slate-500">
                  <span>שלב {step} מתוך {TOTAL_STEPS}</span>
                  <span>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-l from-[#1f6bff] to-[#5fd1f0] transition-[width] duration-500"
                    style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                  />
                </div>
              </div>
            ) : null}

            <div className="p-5 sm:p-7">
              <AnimatePresence mode="wait" initial={false}>
                {status.state === "ok" ? (
                  <motion.div
                    key="done"
                    {...motionProps}
                    className="py-6 text-center"
                  >
                    <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                      <CheckCircle2 className="h-9 w-9" strokeWidth={2.2} />
                    </span>
                    <h3 className="mt-5 text-[22px] font-extrabold text-[#0a1f44]">קיבלנו את הפרטים</h3>
                    <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-slate-600">
                      נציג יחזור אליכם בהקדם לבדיקת זמינות ולהתאמה אישית — ללא התחייבות.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key={`step-${step}`} {...motionProps}>
                    {step === 1 ? (
                      <StepOptions
                        title="היכן נדרש השירות?"
                        options={LOCATION_OPTIONS}
                        selected={answers.location}
                        onSelect={(v) => choose("location", v, 2)}
                      />
                    ) : null}

                    {step === 2 ? (
                      <StepOptions
                        title="מה סוג העזרה הנדרשת?"
                        options={HELP_OPTIONS}
                        selected={answers.help}
                        onSelect={(v) => choose("help", v, 3)}
                        columns
                      />
                    ) : null}

                    {step === 3 ? (
                      <StepOptions
                        title="מתי אתם זקוקים לשירות?"
                        options={TIMING_OPTIONS}
                        selected={answers.timing}
                        onSelect={(v) => choose("timing", v, 4)}
                      />
                    ) : null}

                    {step === 4 ? (
                      <div>
                        <h3 className="text-[19px] font-extrabold text-[#0a1f44]">
                          באיזה אזור נדרש השירות?
                        </h3>
                        <div className="mt-5">
                          <FloatingInput
                            id="matching-city"
                            name="city"
                            label="עיר / אזור"
                            autoComplete="address-level2"
                            value={answers.city}
                            onChange={(e) => setAnswers((a) => ({ ...a, city: e.target.value }))}
                          />
                        </div>
                        <div className="mt-5 flex items-center justify-between gap-3">
                          <BackButton onClick={goBack} />
                          <Button
                            type="button"
                            variant="gradient"
                            size="md"
                            disabled={answers.city.trim().length < 2}
                            onClick={() => choose("city", answers.city.trim(), 5)}
                          >
                            המשך
                            <ArrowLeft className="h-5 w-5 transition-transform group-hover/btn:-translate-x-1" />
                          </Button>
                        </div>
                      </div>
                    ) : null}

                    {step === 5 ? (
                      <form onSubmit={onSubmit} noValidate>
                        <h3 className="text-[19px] font-extrabold text-[#0a1f44]">
                          איך נוכל לחזור אליכם?
                        </h3>
                        <div className="mt-5 space-y-3.5">
                          <FloatingInput
                            id="matching-name"
                            name="name"
                            label="שם מלא"
                            autoComplete="name"
                            required
                            value={answers.name}
                            onChange={(e) => setAnswers((a) => ({ ...a, name: e.target.value }))}
                          />
                          <FloatingInput
                            id="matching-phone"
                            name="phone"
                            label="טלפון"
                            inputMode="tel"
                            autoComplete="tel"
                            required
                            value={answers.phone}
                            onChange={(e) => setAnswers((a) => ({ ...a, phone: e.target.value }))}
                          />
                        </div>

                        {status.state === "err" ? (
                          <div className="mt-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50/90 px-3.5 py-2.5 text-[13px] font-semibold text-rose-900">
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                            <span>{status.message}</span>
                          </div>
                        ) : null}

                        <div className="mt-5 flex items-center justify-between gap-3">
                          <BackButton onClick={goBack} />
                          <Button
                            type="submit"
                            variant="gradient"
                            size="md"
                            disabled={status.state === "loading"}
                          >
                            {status.state === "loading" ? (
                              <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                שולח...
                              </>
                            ) : (
                              <>
                                בדקו עבורי זמינות
                                <ArrowLeft className="h-5 w-5 transition-transform group-hover/btn:-translate-x-1" />
                              </>
                            )}
                          </Button>
                        </div>

                        <p className="mt-4 text-center text-[12.5px] font-medium text-slate-500">
                          נציג יחזור אליכם להתאמה אישית וללא התחייבות.
                        </p>
                      </form>
                    ) : null}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function StepOptions({ title, options, selected, onSelect, columns = false }) {
  return (
    <div>
      <h3 className="text-[19px] font-extrabold text-[#0a1f44]">{title}</h3>
      <div className={["mt-5 grid gap-2.5", columns ? "sm:grid-cols-2" : "sm:grid-cols-2"].join(" ")}>
        {options.map(({ value, icon: Icon }) => {
          const active = selected === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => onSelect(value)}
              aria-pressed={active}
              className={[
                "group flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-start transition",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f6bff]/45",
                active
                  ? "border-[#1f6bff] bg-blue-50/70 ring-1 ring-[#1f6bff]/30"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
              ].join(" ")}
            >
              <span
                className={[
                  "grid h-9 w-9 shrink-0 place-items-center rounded-xl ring-1 transition",
                  active
                    ? "bg-[#1f6bff] text-white ring-[#1f6bff]/40"
                    : "bg-[#eff6ff] text-[#1f6bff] ring-blue-100",
                ].join(" ")}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
              </span>
              <span className="min-w-0 flex-1 text-[14.5px] font-bold text-[#0a1f44]">{value}</span>
              <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-[#1f6bff]" strokeWidth={2.4} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BackButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-bold text-slate-500 transition hover:bg-slate-100 hover:text-[#0a1f44] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
    >
      <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
      חזרה
    </button>
  );
}
