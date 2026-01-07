import { useState, useEffect } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [habits, setHabits] = useState([]); 
  const [inputValue, setInputValue] = useState(""); 

  const addHabit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
const newHabit = {
      id: Date.now(),
      name: inputValue,
      time: "Daily",
      color: "from-blue-500",
      completed: false,
      streak: 0,           // Added: Tracks the count
      lastCompleted: null  // Added: Tracks the date
    };

    setHabits([...habits, newHabit]);
    setInputValue("");
  };

  const toggleHabit = (id) => {
    setHabits(habits.map(h => {
      if (h.id === id) {
        const isCompleting = !h.completed;
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();

        let newStreak = h.streak || 0;

        if (isCompleting) {
          // If last completion was yesterday, streak + 1. If not, start fresh at 1.
          newStreak = (h.lastCompleted === yesterday) ? (h.streak + 1) : 1;
        } else {
          // If unchecking a task, we keep the current streak or you could decrement it
          newStreak = h.streak; 
        }

        return { 
          ...h, 
          completed: isCompleting, 
          streak: isCompleting ? newStreak : h.streak,
          lastCompleted: isCompleting ? today : h.lastCompleted 
        };
      }
      return h;
    }));
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  // NEW STAT CALCULATIONS
  const completedCount = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;
  const completionPercentage = totalHabits > 0 ? Math.round((completedCount / totalHabits) * 100) : 0;
  
  // Calculate the highest streak among all habits
  const currentStreak = habits.length > 0 
    ? Math.max(...habits.map(h => h.streak || 0)) 
    : 0;
    // --- POMODORO LOGIC ---
const [minutes, setMinutes] = useState(25); // State for the input field
  const [timeLeft, setTimeLeft] = useState(25 * 60); 
  const [isActive, setIsActive] = useState(false);

  // Update timeLeft whenever the user changes the "minutes" input (only if not active)
  const handleTimeChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setMinutes(value);
    if (!isActive) {
      setTimeLeft(value * 60);
    }
  };

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsActive(false);
      alert("Time is up! Take a break.");
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen transition-colors duration-500 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white p-4 md:p-8 font-sans">
      
      <header className="max-w-full mx-auto flex justify-between items-start mb-12 px-4">
        <div className="flex flex-col"> 
          <div className="flex items-center gap-4">
            <h1 className="text-5xl font-black tracking-tighter text-blue-500">INNER LOOP</h1>
            <label className="ui-switch">
              <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
              <div className="slider"><div className="circle"></div></div>
            </label>
          </div>
          <p className="text-sm font-light tracking-[0.2em] uppercase text-slate-400 dark:text-white/70 mt-2">
            Habits <span className="text-blue-500 mx-1">→</span> Focus <span className="text-blue-500 mx-1">→</span> Reflection <span className="text-blue-500 mx-1">→</span> Growth
          </p>
        </div>

       <div className="button-container">
          <button className="button">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-1.125 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
          </button>
          <button className="button">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
</svg>

          </button>
          <button className="button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

          </button>
          <button className="button">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>

          </button>
        </div>
      </header>

      {/* ADD HABIT INPUT */}
      <section className="max-w-4xl mx-auto mb-10 px-4">
        <form onSubmit={addHabit} className="flex gap-4 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a new habit (e.g. Meditate)..."
            className="flex-1 bg-transparent border-none outline-none px-4 text-slate-900 dark:text-white placeholder:text-slate-400"
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95">
            Add Habit
          </button>
        </form>
      </section>

      {/* DAILY STATS SECTION */}
      <section className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl backdrop-blur-sm shadow-sm">
          <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-1">Current Streak</p>
          <div className="flex items-baseline gap-2"><span className="text-3xl font-black text-orange-500">{currentStreak}</span><span className="text-sm text-slate-400">days</span></div>
        </div>
        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl backdrop-blur-sm shadow-sm">
          <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-1">Completed</p>
          <div className="flex items-baseline gap-2"><span className="text-3xl font-black text-emerald-500">{completedCount}/{totalHabits}</span><span className="text-sm text-slate-400">habits</span></div>
        </div>
        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl backdrop-blur-sm shadow-sm">
          <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-1">Focus Time</p>
          <div className="flex items-baseline gap-2"><span className="text-3xl font-black text-blue-400">0</span><span className="text-sm text-slate-400">mins today</span></div>
        </div>
        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl backdrop-blur-sm shadow-sm">
          <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-1">Daily Goal</p>
          <div className="flex items-baseline gap-2"><span className="text-3xl font-black text-purple-500">{completionPercentage}%</span><span className="text-sm text-slate-400">reached</span></div>
        </div>
      </section>

 <section className="max-w-4xl mx-auto mb-12 px-4">
        {/* NEW HEADING */}
        <h2 className="text-2xl font-black tracking-tight text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-3">
          <span className="bg-blue-500 w-2 h-8 rounded-full"></span>
          Start your Pomodoro
        </h2>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between shadow-xl">
          
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isActive ? 'bg-red-400' : 'bg-blue-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${isActive ? 'bg-red-500' : 'bg-blue-500'}`}></span>
              </span>
              <h2 className="text-xs font-black tracking-widest uppercase text-slate-400">Deep Work Mode</h2>
            </div>
            
            {/* NEW CUSTOM TIME INPUT */}
            <div className="mt-4 flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Set Duration (Min)</label>
              <input 
                type="number" 
                value={minutes}
                onChange={handleTimeChange}
                disabled={isActive}
                className="w-20 bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50"
              />
            </div>
          </div>

          {/* THE BIG TIMER BUTTON */}
          <button 
            onClick={() => setIsActive(!isActive)}
            className={`group relative w-48 h-48 rounded-full flex flex-col items-center justify-center transition-all duration-500 
            ${isActive ? 'bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)] scale-95' : 'bg-blue-600 hover:bg-blue-500 shadow-lg hover:scale-105'}`}
          >
            <span className="text-5xl font-black text-white tabular-nums">
              {formatTime(timeLeft)}
            </span>
            <span className="text-[10px] font-bold tracking-widest text-white/70 mt-1">
              {isActive ? 'PAUSE' : 'START'}
            </span>
          </button>

          <div className="flex flex-row md:flex-col gap-4">
            <button 
              onClick={() => { setIsActive(false); setTimeLeft(minutes * 60); }}
              className="px-6 py-2 text-xs font-black uppercase tracking-widest border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              Reset
            </button>
            <button 
              onClick={() => { setIsActive(false); setTimeLeft(5 * 60); }}
              className="px-6 py-2 text-xs font-black uppercase tracking-widest border border-slate-200 dark:border-slate-800 rounded-xl hover:text-emerald-500 transition-all"
            >
              Break
            </button>
          </div>
        </div>
      </section>

      {/* HABIT GRID */}
{/* HABIT GRID */}
<div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
  {habits.length > 0 ? (
    habits.map((habit) => (
      <div key={habit.id} className={`bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 relative transition-all shadow-md ${habit.completed ? 'opacity-60' : ''}`}>
        
        {/* CORRECTED DELETE BUTTON */}
        <button 
          onClick={() => deleteHabit(habit.id)}
          className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>

        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{habit.name}</h2>
            <p className="text-slate-500 text-sm">{habit.time}</p>
          </div>
          <div className="relative w-12 h-12 flex items-center justify-center">
  {/* Background Circle (Track) */}
  <svg className="absolute w-full h-full -rotate-90">
    <circle
      cx="24" cy="24" r="20"
      stroke="currentColor"
      strokeWidth="4"
      fill="transparent"
      className="text-slate-200 dark:text-slate-800"
    />
    {/* Progress Circle (Indicator) */}
    <circle
      cx="24" cy="24" r="20"
      stroke="currentColor"
      strokeWidth="4"
      fill="transparent"
      strokeDasharray="125.6"
      strokeDashoffset={habit.completed ? "0" : "125.6"}
      className={`transition-all duration-700 ease-in-out ${
        habit.completed ? 'text-emerald-500' : 'text-slate-300'
      }`}
    />
  </svg>
  {/* Middle Icon or Initial */}
  <span className="text-lg font-bold">{habit.name[0]}</span>
</div>
        </div>

        <button onClick={() => toggleHabit(habit.id)} className="btn w-full">
          <span className="btn-text-one">{habit.completed ? 'Completed' : 'Check In'}</span>
          <span className="btn-text-two">{habit.completed ? 'Undo?' : 'Done!'}</span>
        </button>
      </div>
    ))
  ) : (
    <div className="col-span-full text-center py-20 opacity-50">
      <p>Your loop is empty. Add a habit above to get started!</p>
    </div>
  )}
</div>
    </div>
  );
}

export default App;