
import { useState, useEffect } from 'react';
const HABITS = [
  { id: 1, name: "Morning Yoga", time: "15 Min", color: "from-blue-500" },
  { id: 2, name: "Read 10 Pages", time: "20 Min", color: "from-purple-500" },
  { id: 3, name: "Drink Water", time: "2 Liters", color: "from-emerald-500" },
  { id: 4, name: "Journaling", time: "5 Min", color: "from-orange-500" },
];


function App() {
  const [darkMode, setDarkMode] = useState(true);

useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [darkMode]);
  return (
    <div className="min-h-screen transition-colors duration-500 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white p-4 md:p-8 font-sans">
      
      {/* YOUR NEW CUSTOM HEADER */}
      <header className="max-w-full mx-auto flex justify-between items-center mb-12 px-4">
        <div className="flex items-center gap-4">
          <h1 className="text-5xl font-black tracking-tighter text-blue-500">
            INNER LOOP
          </h1>
          <label className="ui-switch">
      <input 
        type="checkbox" 
        checked={darkMode} 
        onChange={() => setDarkMode(!darkMode)} 
      />
      <div className="slider">
        <div className="circle"></div>
      </div>
    </label>
        </div>
        <p className="text-sm font-light tracking-[0.2em] uppercase text-slate-400 dark:text-white/70 mt-1">
      Habits <span className="text-blue-500 mx-1">→</span> Focus <span className="text-blue-500 mx-1">→</span> Reflection <span className="text-blue-500 mx-1">→</span> Growth
    </p>
    

        {/* The Uiverse Navigation Snippet */}
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
{/* DAILY STATS SECTION */}
<section className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
  <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl backdrop-blur-sm shadow-sm dark:shadow-none">
    <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-1">Current Streak</p>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-black text-orange-500">12</span>
      <span className="text-sm text-slate-400">days</span>
    </div>
  </div>

  <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl backdrop-blur-sm shadow-sm dark:shadow-none">
    <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-1">Completed</p>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-black text-emerald-500">4/6</span>
      <span className="text-sm text-slate-400">habits</span>
    </div>
  </div>

  <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl backdrop-blur-sm shadow-sm dark:shadow-none">
  <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-1">Focus Time</p>
  <div className="flex items-baseline gap-2">
    <span className="text-3xl font-black text-blue-400">45</span>
    <span className="text-sm text-slate-400">mins today</span>
  </div>
</div>

  <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl backdrop-blur-sm shadow-sm dark:shadow-none">
    <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-1">Daily Goal</p>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-black text-purple-500">66%</span>
      <span className="text-sm text-slate-400">reached</span>
    </div>
  </div>
</section>

      {/* This is the Grid container */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {HABITS.map((habit) => (
          <div key={habit.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all shadow-md dark:shadow-xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold">{habit.name}</h2>
                <p className="text-slate-500 text-sm">{habit.time}</p>
              </div>
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${habit.color} shadow-[0_0_10px_rgba(0,0,0,0.5)]`}></div>
            </div>

            {/* Your Uiverse Button */}
            <button className="btn w-full">
              <span className="btn-text-one">Check In</span>
              <span className="btn-text-two">Done!</span>
            </button>
          </div>
        ))}

      </div>
    </div>
  )
}

export default App