
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Target, Trophy, Clock, Flame } from 'lucide-react';

const data = [
  { name: 'Mon', value: 4 },
  { name: 'Tue', value: 6 },
  { name: 'Wed', value: 8 },
  { name: 'Thu', value: 5 },
  { name: 'Fri', value: 7 },
  { name: 'Sat', value: 2 },
  { name: 'Sun', value: 1 },
];

const COLORS = ['#10b981', '#10b981', '#10b981', '#10b981', '#10b981', '#10b981', '#10b981'];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d] flex flex-col justify-between hover:border-emerald-500/50 transition-colors">
          <div className="flex items-center justify-between">
            <Clock className="text-emerald-500" size={24} />
            <span className="text-xs text-[#8b949e]">Total Focus</span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-white">32.5h</div>
            <div className="text-sm text-emerald-500">+12% from last week</div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d] flex flex-col justify-between hover:border-emerald-500/50 transition-colors">
          <div className="flex items-center justify-between">
            <Flame className="text-orange-500" size={24} />
            <span className="text-xs text-[#8b949e]">Current Streak</span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-white">5 Days</div>
            <div className="text-sm text-orange-500">Keep it burning!</div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d] flex flex-col justify-between hover:border-emerald-500/50 transition-colors">
          <div className="flex items-center justify-between">
            <Target className="text-blue-500" size={24} />
            <span className="text-xs text-[#8b949e]">PRs Merged</span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-white">14</div>
            <div className="text-sm text-[#8b949e]">On track for sprint</div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d] flex flex-col justify-between hover:border-emerald-500/50 transition-colors">
          <div className="flex items-center justify-between">
            <Trophy className="text-yellow-500" size={24} />
            <span className="text-xs text-[#8b949e]">Level</span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-white">Lvl 24</div>
            <div className="text-sm text-yellow-500">Senior Maintainer</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#161b22] border border-[#30363d]">
          <h3 className="text-lg font-semibold text-white mb-6">Focus Hours Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#30363d" />
                <XAxis dataKey="name" stroke="#8b949e" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#8b949e" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: '#21262d'}}
                  contentStyle={{backgroundColor: '#161b22', borderColor: '#30363d', color: '#c9d1d9'}}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.value > 6 ? '#10b981' : '#34d399'} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d]">
          <h3 className="text-lg font-semibold text-white mb-6">Today's Missions</h3>
          <div className="space-y-4">
            {[
              { label: 'Fix Critical CI/CD Bug', status: 'done', xp: '500 XP' },
              { label: 'Refactor Auth Service', status: 'todo', xp: '800 XP' },
              { label: 'Review 3 Pull Requests', status: 'todo', xp: '300 XP' },
              { label: 'Update Documentation', status: 'todo', xp: '200 XP' },
            ].map((mission, i) => (
              <div key={i} className="group flex items-center justify-between p-3 rounded-lg hover:bg-[#21262d] transition-colors border border-transparent hover:border-[#30363d]">
                <div className="flex items-center space-x-3">
                  <input 
                    type="checkbox" 
                    readOnly 
                    checked={mission.status === 'done'} 
                    className="h-4 w-4 rounded border-[#30363d] bg-transparent text-emerald-500 focus:ring-emerald-500"
                  />
                  <span className={`text-sm ${mission.status === 'done' ? 'line-through text-[#8b949e]' : 'text-white'}`}>
                    {mission.label}
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                  {mission.xp}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 px-4 rounded-lg bg-[#21262d] text-white hover:bg-[#30363d] transition-colors text-sm font-medium">
            Manage Missions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
