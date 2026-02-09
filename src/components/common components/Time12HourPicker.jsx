import { useEffect, useMemo, useRef, useState, useCallback } from "react";

const generate = (count, start = 0) =>
  Array.from({ length: count }, (_, i) => String(i + start).padStart(2, "0"));

export default function Time12HourPicker({ value, onChange, error }) {
  const wrapperRef = useRef(null);
  const hourColRef = useRef(null);
  const minuteColRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [time, setTime] = useState({
    hour: "",
    minute: "",
    meridian: "AM",
  });

  const HOURS = useMemo(() => generate(12, 1), []);
  const MINUTES = useMemo(() => generate(60), []);

  const loopHours = useMemo(() => [...HOURS, ...HOURS, ...HOURS], [HOURS]);
  const loopMinutes = useMemo(() => [...MINUTES, ...MINUTES, ...MINUTES], [MINUTES]);

  useEffect(() => {
    if (!value) return;

    const [hStr, minute] = value.split(":");
    let hour = Number(hStr);
    let meridian = hour >= 12 ? "PM" : "AM";

    if (hour === 0) hour = 12;
    if (hour > 12) hour -= 12;

    setTime({
      hour: String(hour).padStart(2, "0"),
      minute,
      meridian,
    });
  }, [value]);

  useEffect(() => {
    if (!time.hour || !time.minute) return;

    let h = Number(time.hour);
    if (time.meridian === "PM" && h !== 12) h += 12;
    if (time.meridian === "AM" && h === 12) h = 0;

    const formatted = `${String(h).padStart(2, "0")}:${time.minute}`;

    if (formatted !== value) {
      onChange(formatted);
    }
  }, [time, value, onChange]);

  const centerItem = useCallback((ref, value) => {
    if (!ref.current || !value) return;

    const items = ref.current.children;
    for (let el of items) {
      if (el.textContent === value) {
        const containerHeight = ref.current.clientHeight;
        ref.current.scrollTop = el.offsetTop - containerHeight / 2 + el.offsetHeight / 2;
        break;
      }
    }
  }, []);

  const handleLoopScroll = (ref) => {
    if (!ref.current) return;

    const totalHeight = ref.current.scrollHeight;
    const sectionHeight = totalHeight / 3;
    const scrollTop = ref.current.scrollTop;

    if (scrollTop < sectionHeight * 0.5) {
      ref.current.scrollTop += sectionHeight;
    } else if (scrollTop > sectionHeight * 1.5) {
      ref.current.scrollTop -= sectionHeight;
    }
  };

  useEffect(() => {
    if (!open) return;

    const centerList = (ref) => {
      if (!ref.current) return;
      ref.current.scrollTop = ref.current.scrollHeight / 3;
    };

    centerList(hourColRef);
    centerList(minuteColRef);

    requestAnimationFrame(() => {
      centerItem(hourColRef, time.hour);
      centerItem(minuteColRef, time.minute);
    });
  }, [open, time.hour, time.minute, centerItem]);

  const update = (next) => {
    setTime((prev) => ({ ...prev, ...next }));

    if (next.hour) centerItem(hourColRef, next.hour);
    if (next.minute) centerItem(minuteColRef, next.minute);
  };

  useEffect(() => {
    const handler = (e) => {
      if (!wrapperRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="time-wrapper" ref={wrapperRef}>
      <div className="time-pill" onClick={() => setOpen((o) => !o)}>
        {time.hour || "HH"}:{time.minute || "MM"} {time.meridian}
      </div>

      {open && (
        <div className="time-dropdown">
          <div className="col" ref={hourColRef} onScroll={() => handleLoopScroll(hourColRef)}>
            {loopHours.map((h, i) => (
              <div
                key={`h-${i}`}
                className={`time-item ${time.hour === h ? "active" : ""}`}
                onClick={() => update({ hour: h })}
              >
                {h}
              </div>
            ))}
          </div>

          <div className="col" ref={minuteColRef} onScroll={() => handleLoopScroll(minuteColRef)}>
            {loopMinutes.map((m, i) => (
              <div
                key={`m-${i}`}
                className={`time-item ${time.minute === m ? "active" : ""}`}
                onClick={() => update({ minute: m })}
              >
                {m}
              </div>
            ))}
          </div>

          <div className="col">
            {["AM", "PM"].map((p) => (
              <div
                key={p}
                className={`time-item ${time.meridian === p ? "active" : ""}`}
                onClick={() => update({ meridian: p })}
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      )}

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
