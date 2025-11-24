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

  // 🖼️ Carousel data
  const detectionImages = [
    "/cloudy.PNG",
    "/Rainy.png",
    "/sunny.PNG",
    "/UFPR04_cloudy.png",
    "/UFPR04_rainy.png",
    "/UFPR04_sunny.png",
    "/UFPR05_cloudy.png",
    "/UFPR05_rainy.png",
    "/UFPR05_sunny.png",
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

  const availableCount = slots.filter((s) => s.status === "available").length;
  const occupiedCount = slots.length - availableCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 py-12 px-4">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 max-w-4xl mx-auto"
      >
        <Badge variant="premium" className="mb-4">
          <MapPin size={14} className="mr-1" />
          Live Monitoring System
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Parking Lot Overview
        </h2>
        <p className="text-gray-400 text-lg">
          Real-time AI detection powered by YOLOv8 and TensorFlow
        </p>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <Card className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-500/30">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-emerald-400">
                {availableCount}
              </div>
              <div className="text-sm text-gray-300 flex items-center justify-center mt-1">
                <CheckCircle size={14} className="mr-1" />
                Available
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border-red-500/30">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-red-400">
                {occupiedCount}
              </div>
              <div className="text-sm text-gray-300 flex items-center justify-center mt-1">
                <XCircle size={14} className="mr-1" />
                Occupied
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-400">
                {Math.round((availableCount / slots.length) * 100)}%
              </div>
              <div className="text-sm text-gray-300 flex items-center justify-center mt-1">
                <Clock size={14} className="mr-1" />
                Availability
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <div className="flex flex-col gap-12 items-center max-w-7xl mx-auto">
        {/* Image Detection Output */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-5xl"
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
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-xl overflow-hidden shadow-2xl"
              >
                <img
                  src="/UFPR05_rainy.png"
                  alt="AI Detection Image Preview"
                  className="w-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-semibold">
                  99.2% Accuracy
                </div>
              </motion.div>
              <p className="text-center text-gray-400 text-sm mt-4 flex items-center justify-center gap-2">
                <CheckCircle size={16} className="text-emerald-400" />
                Real-time detection from trained CNN model on rainy conditions
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Clickable Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="w-full max-w-6xl"
        >
          <Card className="bg-gradient-to-br from-slate-800/90 to-gray-800/90 backdrop-blur-xl border-gray-700/50">
            <CardHeader className="border-b border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <ImageIcon size={20} className="text-white" />
                </div>
                <div>
                  <CardTitle className="text-white text-2xl">
                    Detection Gallery
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Interactive carousel with 9 detection results
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="relative flex items-center justify-center">
                {/* Left Button */}
                <Button
                  onClick={handlePrev}
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 sm:left-4 z-10 bg-white/90 hover:bg-emerald-500 hover:text-white rounded-full shadow-lg"
                >
                  <ChevronLeft size={24} />
                </Button>

                {/* Image Frame */}
                <div className="w-full max-w-4xl h-[400px] flex justify-center items-center overflow-hidden rounded-xl shadow-2xl border border-gray-700/50">
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
                  className="absolute right-2 sm:right-4 z-10 bg-white/90 hover:bg-emerald-500 hover:text-white rounded-full shadow-lg"
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
                Browse through AI detection results from 9 different scenarios
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Video Detection Output */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="w-full max-w-5xl"
        >
          <Card className="bg-gradient-to-br from-slate-800/90 to-gray-800/90 backdrop-blur-xl border-gray-700/50">
            <CardHeader className="border-b border-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                    <Video size={20} className="text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-2xl">
                      Real-Time Video Detection
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Live monitoring with YOLOv8 model
                    </CardDescription>
                  </div>
                </div>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
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
                <video
                  src="/space2.mp4"
                  controls
                  autoPlay
                  loop
                  muted
                  className="w-full object-cover"
                />
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

      {/* Parking Slot Grid Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-16 w-full max-w-7xl mx-auto"
      >
        <Card className="bg-gradient-to-br from-slate-800/90 to-gray-800/90 backdrop-blur-xl border-gray-700/50">
          <CardHeader className="border-b border-gray-700/50">
            <CardTitle className="text-white text-3xl text-center">
              Interactive Parking Grid
            </CardTitle>
            <CardDescription className="text-gray-400 text-center text-base">
              Click on any available slot to book instantly
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 flex justify-center">
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4 max-w-6xl">
              {[...Array(41)].map((_, i) => {
                const slotNumber = i + 1;
                const occupiedSlots = [1, 10, 11, 29, 30, 32];
                const isAvailable = !occupiedSlots.includes(slotNumber);

                return (
                  <Link
                    key={slotNumber}
                    to={isAvailable ? `/booking?slot=${slotNumber}` : "#"}
                    className={`${!isAvailable && "cursor-not-allowed"}`}
                  >
                    <motion.div
                      whileHover={isAvailable ? { scale: 1.08, y: -4 } : {}}
                      whileTap={isAvailable ? { scale: 0.95 } : {}}
                      transition={{ duration: 0.2 }}
                      className={`relative rounded-xl h-24 flex flex-col justify-center items-center 
                                  shadow-lg hover:shadow-2xl transition-all overflow-hidden group
                                  ${
                                    isAvailable
                                      ? "bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                                      : "bg-gradient-to-br from-red-500 to-pink-600 opacity-70"
                                  }`}
                    >
                      {/* Shine effect on hover */}
                      {isAvailable && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      )}

                      <span className="font-bold text-xl text-white relative z-10">
                        {slotNumber}
                      </span>
                      <span className="text-xs text-white/90 font-medium relative z-10 flex items-center gap-1">
                        {isAvailable ? (
                          <>
                            <CheckCircle size={12} />
                            Available
                          </>
                        ) : (
                          <>
                            <XCircle size={12} />
                            Occupied
                          </>
                        )}
                      </span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex justify-center items-center gap-8 mt-10 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg"></div>
                <span className="text-gray-300 font-medium">
                  Available{" "}
                  <span className="text-emerald-400 font-bold">(35 slots)</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-red-500 to-pink-600 shadow-lg opacity-70"></div>
                <span className="text-gray-300 font-medium">
                  Occupied{" "}
                  <span className="text-red-400 font-bold">(6 slots)</span>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}