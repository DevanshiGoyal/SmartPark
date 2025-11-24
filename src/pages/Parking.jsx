import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Video,
  Image as ImageIcon,
  CheckCircle,
  XCircle,
  MapPin,
  Clock,
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

export default function Parking() {
  const [slots] = useState([
    { id: 1, status: "available" },
    { id: 2, status: "occupied" },
    { id: 3, status: "available" },
    { id: 4, status: "occupied" },
    { id: 5, status: "available" },
    { id: 6, status: "available" },
  ]);

  // Image carousel data (placeholder paths - you can replace with actual images)
  const detectionImages = [
    "https://via.placeholder.com/800x450/059669/ffffff?text=Cloudy+Detection",
    "https://via.placeholder.com/800x450/0891b2/ffffff?text=Rainy+Detection",
    "https://via.placeholder.com/800x450/f59e0b/ffffff?text=Sunny+Detection",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % detectionImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? detectionImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 py-12 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 max-w-4xl mx-auto"
      >
        <Badge variant="success" className="mb-4">
          <CheckCircle size={14} className="mr-1" />
          Live Detection System
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Smart Parking Detection
        </h2>
        <p className="text-gray-400 text-lg">
          Real-time AI-powered parking slot detection and availability tracking
        </p>
      </motion.div>

      {/* Detection Output Section */}
      <div className="max-w-5xl mx-auto space-y-8 mb-12">
        {/* Image Detection Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <Card className="bg-gradient-to-br from-slate-800/90 to-gray-800/90 backdrop-blur-xl border-gray-700/50 overflow-hidden">
            <CardHeader className="border-b border-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <ImageIcon size={20} className="text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-2xl">
                      AI Detection Output
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Image Mode - YOLOv8 Model
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="success" className="animate-pulse">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Live
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Carousel */}
              <div className="relative">
                {/* Left Button */}
                <Button
                  onClick={handlePrev}
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-emerald-500 hover:text-white rounded-full shadow-lg"
                >
                  <ChevronLeft size={24} />
                </Button>

                {/* Image Container */}
                <div className="relative w-full h-[300px] sm:h-[450px] rounded-xl overflow-hidden bg-gray-900">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentIndex}
                      src={detectionImages[currentIndex]}
                      alt={`Detection ${currentIndex + 1}`}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                    />
                  </AnimatePresence>
                </div>

                {/* Right Button */}
                <Button
                  onClick={handleNext}
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-emerald-500 hover:text-white rounded-full shadow-lg"
                >
                  <ChevronRight size={24} />
                </Button>
              </div>

              {/* Indicator Dots */}
              <div className="flex justify-center mt-6 gap-2">
                {detectionImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentIndex
                        ? "w-8 bg-emerald-500"
                        : "w-2 bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>

              <p className="text-center text-gray-400 text-sm mt-6 flex items-center justify-center gap-2">
                <ImageIcon size={16} className="text-blue-400" />
                Browse through AI detection results from different scenarios
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Video Detection */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="w-full"
        >
          <Card className="bg-gradient-to-br from-slate-800/90 to-gray-800/90 backdrop-blur-xl border-gray-700/50">
            <CardHeader className="border-b border-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <Video size={20} className="text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-2xl">
                      Live Video Feed
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Real-time processing - 30 FPS
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="success" className="animate-pulse">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  Recording
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-700/50"
              >
                <div className="w-full h-[300px] sm:h-[450px] bg-gray-900 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Video size={48} className="mx-auto mb-2 text-emerald-500" />
                    <p>Video feed placeholder</p>
                    <p className="text-sm mt-2">Connect camera to start detection</p>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-xs font-semibold flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  Live Feed
                </div>
              </motion.div>
              <p className="text-center text-gray-400 text-sm mt-4 flex items-center justify-center gap-2">
                <Video size={16} className="text-red-400" />
                Real-time occupancy detection with instant notifications
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Parking Slot Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="max-w-5xl mx-auto"
      >
        <Card className="bg-gradient-to-br from-slate-800/90 to-gray-800/90 backdrop-blur-xl border-gray-700/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-2xl">
                Current Parking Status
              </CardTitle>
              <Badge variant="default">
                {slots.filter((s) => s.status === "available").length} Available
              </Badge>
            </div>
            <CardDescription className="text-gray-400">
              Real-time parking slot availability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {slots.map((slot) => (
                <motion.div
                  key={slot.id}
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    slot.status === "available"
                      ? "bg-emerald-500/10 border-emerald-500/50 hover:bg-emerald-500/20"
                      : "bg-red-500/10 border-red-500/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-bold text-lg">
                      Slot {slot.id}
                    </span>
                    {slot.status === "available" ? (
                      <CheckCircle className="text-emerald-400" size={20} />
                    ) : (
                      <XCircle className="text-red-400" size={20} />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={14} className="text-gray-400" />
                    <span className="text-gray-400">Level 1, Zone A</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <Clock size={14} className="text-gray-400" />
                    <span className="text-gray-400">
                      {slot.status === "available"
                        ? "Available now"
                        : "Occupied - 2h"}
                    </span>
                  </div>
                  {slot.status === "available" && (
                    <Link to="/booking">
                      <Button
                        size="sm"
                        className="w-full mt-4"
                      >
                        Book Now
                      </Button>
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
