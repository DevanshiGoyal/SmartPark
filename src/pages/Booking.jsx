import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  Download,
  Share2,
  CheckCircle,
  Award,
  Shield,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

export default function Booking() {
  const [bookingData, setBookingData] = useState({
    location: "",
    date: "",
    time: "",
    duration: "2",
  });

  const [confirmed, setConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const calculatePrice = () => {
    const baseRate = 5; // $5 per hour
    return (baseRate * parseFloat(bookingData.duration || 0)).toFixed(2);
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (
      bookingData.location &&
      bookingData.date &&
      bookingData.time &&
      bookingData.duration
    ) {
      const id = `PS-${Date.now().toString().slice(-8)}`;
      setBookingId(id);
      setConfirmed(true);
    }
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
          <Award size={14} className="mr-1" />
          Premium Booking Experience
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Reserve Your Parking Spot
        </h2>
        <p className="text-gray-400 text-lg">
          Secure your spot in advance with our smart booking system
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Booking Form */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="bg-gradient-to-br from-slate-800/90 to-gray-800/90 backdrop-blur-xl border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white text-2xl">
                Booking Details
              </CardTitle>
              <CardDescription className="text-gray-400">
                Fill in the details to reserve your parking spot
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleConfirmBooking} className="space-y-6">
                {/* Location */}
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2"
                  >
                    <MapPin size={16} className="text-emerald-400" />
                    Parking Location
                  </label>
                  <select
                    id="location"
                    name="location"
                    value={bookingData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/70 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select a location</option>
                    <option value="downtown">Downtown Plaza - Level 1</option>
                    <option value="mall">Shopping Mall - Zone A</option>
                    <option value="airport">Airport Terminal - P2</option>
                    <option value="stadium">Stadium North - VIP</option>
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2"
                  >
                    <Calendar size={16} className="text-blue-400" />
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={bookingData.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 bg-gray-900/70 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Time */}
                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2"
                  >
                    <Clock size={16} className="text-purple-400" />
                    Arrival Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={bookingData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/70 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Duration */}
                <div>
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2"
                  >
                    <Clock size={16} className="text-emerald-400" />
                    Duration (hours)
                  </label>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={bookingData.duration}
                    onChange={handleInputChange}
                    required
                    min="1"
                    max="12"
                    step="0.5"
                    className="w-full px-4 py-3 bg-gray-900/70 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                {/* Price Display */}
                <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg p-4 border border-emerald-500/30">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-medium">
                      Total Price:
                    </span>
                    <span className="text-2xl font-bold text-white">
                      ${calculatePrice()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Base rate: $5.00/hour
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={confirmed}
                >
                  <CreditCard size={20} className="mr-2" />
                  {confirmed ? "Booking Confirmed" : "Confirm Booking"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Confirmation Card or Benefits */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {confirmed ? (
            // Confirmation Card
            <Card className="bg-gradient-to-br from-emerald-800/90 to-green-800/90 backdrop-blur-xl border-emerald-700/50">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
                    <CheckCircle size={24} className="text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-2xl">
                      Booking Confirmed!
                    </CardTitle>
                    <CardDescription className="text-emerald-200">
                      Your parking spot is reserved
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <p className="text-sm text-emerald-200 mb-1">Booking ID</p>
                  <p className="text-2xl font-bold text-white font-mono">
                    {bookingId}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-white">
                    <MapPin size={18} className="text-emerald-300" />
                    <span>
                      {bookingData.location
                        .split("-")
                        .map((word) => word.trim())
                        .join(" - ")}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <Calendar size={18} className="text-blue-300" />
                    <span>
                      {new Date(bookingData.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <Clock size={18} className="text-purple-300" />
                    <span>
                      {bookingData.time} ({bookingData.duration} hours)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <CreditCard size={18} className="text-emerald-300" />
                    <span className="font-bold">${calculatePrice()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  <Download size={18} className="mr-2" />
                  Download
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 size={18} className="mr-2" />
                  Share
                </Button>
              </CardFooter>
            </Card>
          ) : (
            // Benefits Card
            <Card className="bg-gradient-to-br from-slate-800/90 to-gray-800/90 backdrop-blur-xl border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white text-2xl">
                  VIP Booking Perks
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Enjoy exclusive benefits with every reservation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    icon: Shield,
                    title: "Guaranteed Spot",
                    desc: "Your spot is reserved and protected",
                    color: "text-blue-400",
                  },
                  {
                    icon: Clock,
                    title: "Flexible Timing",
                    desc: "15-minute grace period included",
                    color: "text-purple-400",
                  },
                  {
                    icon: Award,
                    title: "Priority Support",
                    desc: "24/7 customer service for bookings",
                    color: "text-emerald-400",
                  },
                  {
                    icon: CreditCard,
                    title: "Instant Confirmation",
                    desc: "Receive QR code immediately",
                    color: "text-pink-400",
                  },
                ].map((perk, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-lg bg-gray-900/50 border border-gray-700/50 hover:border-emerald-500/50 transition-all"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br from-${perk.color.split("-")[1]}-500/20 to-${perk.color.split("-")[1]}-600/20 flex items-center justify-center`}
                    >
                      <perk.icon size={20} className={perk.color} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">
                        {perk.title}
                      </h4>
                      <p className="text-gray-400 text-sm">{perk.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
