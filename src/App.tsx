/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ModeSelect } from './pages/ModeSelect';
import { Menu } from './pages/Menu';
import { Options } from './pages/Options';
import { Cart } from './pages/Cart';
import { Payment } from './pages/Payment';
import { Confirm } from './pages/Confirm';
import { Complete } from './pages/Complete';
import { Board } from './pages/Board';
import { AdminLayout } from './components/layout/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminMenu } from './pages/admin/AdminMenu';
import { AdminVoice } from './pages/admin/AdminVoice';
import { AdminPosts } from './pages/admin/AdminPosts';
import { AdminSettings } from './pages/admin/AdminSettings';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Kiosk Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/mode-select" element={<ModeSelect />} />
        <Route path="/kiosk/menu" element={<Menu />} />
        <Route path="/kiosk/options/:id" element={<Options />} />
        <Route path="/kiosk/cart" element={<Cart />} />
        <Route path="/kiosk/payment" element={<Payment />} />
        <Route path="/kiosk/confirm" element={<Confirm />} />
        <Route path="/kiosk/complete" element={<Complete />} />
        <Route path="/board" element={<Board />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="menu" element={<AdminMenu />} />
          <Route path="voice" element={<AdminVoice />} />
          <Route path="posts" element={<AdminPosts />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}
