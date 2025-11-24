import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Navigation,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  TrendingUp,
  Activity,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function Traffic() {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const zones = [
    {
      id: 1,
      name: "Downtown Plaza",
      status: "high",
      congestion: 85,
      forecast: [
        { time: "Now", level: 85 },
        { time: "+1h", level: 88 },
        { time: "+2h", level: 92 },
        { time: "+3h", level: 78 },
        { time: "+4h", level: 65 },
      ],
    },
    {
      id: 2,
      name: "Shopping Mall",
      status: "medium",
      congestion: 62,
      forecast: [
        { time: "Now", level: 62 },
        { time: "+1h", level: 68 },
        { time: "+2h", level: 72 },
        { time: "+3h", level: 58 },
        { time: "+4h", level: 45 },
      ],
    },
    {
      id: 3,
      name: "Airport Terminal",
      status: "low",
      congestion: 35,
      forecast: [
        { time: "Now", level: 35 },
        { time: "+1h", level: 38 },
        { time: "+2h", level: 42 },
        { time: "+3h", level: 55 },
        { time: "+4h", level: 68 },
      ],
    },
    {
      id: 4,
      name: "Stadium North",
      status: "low",
      congestion: 28,
      forecast: [
        { time: "Now", level: 28 },
        { time: "+1h", level: 32 },
        { time: "+2h", level: 28 },
        { time: "+3h", level: 25 },
        { time: "+4h", level: 22 },
      ],
    },
  ];

  const cityWideDemand = [
    { time: "00:00", demand: 45 },
    { time: "03:00", demand: 28 },
    { time: "06:00", demand: 52 },
    { time: "09:00", demand: 78 },
    { time: "12:00", demand: 92 },
    { time: "15:00", demand: 85 },
    { time: "18:00", demand: 95 },
    { time: "21:00", demand: 68 },
  ];

  const weeklyForecast = [
    { day: "Mon", congestion: 75 },
    { day: "Tue", congestion: 80 },
    { day: "Wed", congestion: 85 },
    { day: "Thu", congestion: 82 },
    { day: "Fri", congestion: 92 },
    { day: "Sat", congestion: 65 },
    { day: "Sun", congestion: 50 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "high":
        return "text-red-400 bg-red-500/20 border-red-500/50";
      case "medium":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/50";
      case "low":
        return "text-green-400 bg-green-500/20 border-green-500/50";
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/50";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "high":
        return <AlertTriangle size={20} className="text-red-400" />;
      case "medium":
        return <Clock size={20} className="text-yellow-400" />;
      case "low":
        return <CheckCircle size={20} className="text-green-400" />;
      default:
        return <Activity size={20} className="text-gray-400" />;
    }
  };

  const handleManualRefresh = () => {
    setLastUpdate(new Date());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 py-12 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 max-w-4xl mx-auto"
      >
        <Badge variant="premium" className="mb-4">
          <Navigation size={14} className="mr-1" />
          Smart Traffic Monitoring
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Traffic & Congestion Forecast
        </h2>
        <p className="text-gray-400 text-lg">
          AI-powered traffic prediction and route optimization
        </p>
        <div className="flex items-center justify-center gap-4 mt-6">
          <Badge variant="success">
            <Activity size={14} className="mr-1 animate-pulse" />
            Live Monitoring
          </Badge>
          <span className="text-gray-500 text-sm">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={handleManualRefresh}
            className="ml-2"
          >
            <RefreshCw size={14} className="mr-1" />
            Refresh
          </Button>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Zone Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {zones.map((zone, idx) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-slate-800/90 to-gray-800/90 backdrop-blur-xl border-gray-700/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <MapPin size={20} className="text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-xl">
                          {zone.name}
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          Congestion Level: {zone.congestion}%
                        </CardDescription>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-lg border-2 flex items-center gap-2 ${getStatusColor(
                        zone.status
                      )}`}
                    >
                      {getStatusIcon(zone.status)}
                      <span className="font-semibold uppercase text-xs">
                        {zone.status}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Congestion Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Current Congestion</span>
                      <span className="font-bold">{zone.congestion}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${zone.congestion}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className={`h-full rounded-full ${
                          zone.status === "high"
                            ? "bg-gradient-to-r from-red-500 to-orange-500"
                            : zone.status === "medium"
                            ? "bg-gradient-to-r from-yellow-500 to-amber-500"
                            : "bg-gradient-to-r from-green-500 to-emerald-500"
                        }`}
                      />
                    </div>
                  </div>

                  {/* 12-Hour Forecast Chart */}
                  <div className="mt-4">
                    <h4 className="text-white font-semibold mb-3 text-sm flex items-center gap-2">
                      <TrendingUp size={16} className="text-blue-400" />
                      12-Hour Forecast
                    </h4>
                    <ResponsiveContainer width="100%" height={120}>
                      <LineChart data={zone.forecast}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#374151"
                        />
                        <XAxis
                          dataKey="time"
                          stroke="#9ca3af"
                          tick={{ fontSize: 10 }}
                        />
                        <YAxis stroke="#9ca3af" tick={{ fontSize: 10 }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1f2937",
                            border: "1px solid #374151",
                            borderRadius: "8px",
                            color: "#fff",
                            fontSize: "12px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="level"
                          stroke={
                            zone.status === "high"
                              ? "#ef4444"
                              : zone.status === "medium"
                              ? "#f59e0b"
                              : "#10b981"
                          }
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* City-Wide Demand Chart */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-slate-800/90 to-gray-800/90 backdrop-blur-xl border-gray-700/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-2xl">
                    City-Wide Demand Pattern
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    24-hour traffic demand across all zones
                  </CardDescription>
                </div>
                <Badge variant="success">
                  <Activity size={14} className="mr-1" />
                  Real-Time
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={cityWideDemand}>
                  <defs>
                    <linearGradient
                      id="colorDemand"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="demand"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    fill="url(#colorDemand)"
                    dot={{ fill: "#8b5cf6", r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weekly Forecast */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-slate-800/90 to-gray-800/90 backdrop-blur-xl border-gray-700/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-2xl">
                    Weekly Traffic Forecast
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    AI-powered predictions for the upcoming week
                  </CardDescription>
                </div>
                <Badge variant="premium">
                  <TrendingUp size={14} className="mr-1" />
                  AI Model
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyForecast}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="congestion"
                    fill="#3b82f6"
                    radius={[8, 8, 0, 0]}
                    name="Predicted Congestion %"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
