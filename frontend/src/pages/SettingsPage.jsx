import { useState } from 'react';
import { useToast } from '../components/Toast.jsx';

export default function SettingsPage({ settings, onUpdate }) {
  const [name, setName] = useState(settings.name);
  const [email, setEmail] = useState(settings.email);
  const showToast = useToast();

  function handleSave(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onUpdate({ name: name.trim(), email: email.trim() });
    showToast('Settings saved!', 'success');
  }

  function handleReset() {
    const defaults = { name: 'User', email: 'user@example.com' };
    setName(defaults.name);
    setEmail(defaults.email);
    onUpdate(defaults);
    showToast('Settings reset to default.', 'info');
  }

  const initial = name.trim().charAt(0).toUpperCase() || 'U';

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-2xl mx-auto py-6 space-y-6">

        {/* Avatar preview */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-200 to-amber-400 flex items-center justify-center text-white text-3xl font-bold shrink-0">
            {initial}
          </div>
          <div>
            <p className="font-bold text-xl text-gray-800">{name || 'User'}</p>
            <p className="text-gray-400 text-sm mt-0.5">{email || '—'}</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-bold text-lg text-gray-800 mb-1">Profile Settings</h2>
          <div className="w-8 h-0.5 bg-[#ff6767] rounded-full mb-6" />

          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#ff6767] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#ff6767] transition-colors"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="bg-[#ff6767] text-white font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-red-500 transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="border border-gray-300 text-gray-600 font-semibold text-sm px-6 py-2.5 rounded-lg hover:border-[#ff6767] hover:text-[#ff6767] transition-colors"
              >
                Reset Default
              </button>
            </div>
          </form>
        </div>

        {/* App info */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-bold text-lg text-gray-800 mb-1">About</h2>
          <div className="w-8 h-0.5 bg-[#ff6767] rounded-full mb-4" />
          <div className="space-y-2 text-sm text-gray-600">
            <p><span className="font-medium text-gray-800">App:</span> TodoList — Claude AI</p>
            <p><span className="font-medium text-gray-800">Version:</span> 1.0.0</p>
            <p><span className="font-medium text-gray-800">Stack:</span> React 18, Node.js, MongoDB</p>
          </div>
        </div>

      </div>
    </div>
  );
}
