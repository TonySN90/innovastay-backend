import { Request, Response, NextFunction } from 'express';
import AdministratorModel from '../models/administratorModel';

declare module 'express-session' {
  interface SessionData {
    adminUser?: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
  }
}

export const requireAdminAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session?.adminUser) {
    return next();
  }
  
  // If it's an API request, return JSON error
  if (req.path.startsWith('/admin/api')) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  // For regular requests, redirect to login
  return res.redirect('/admin-login');
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).render('admin-login', { 
        error: 'Email und Passwort sind erforderlich' 
      });
    }
    
    const administrator = await AdministratorModel.findOne({ email }).select('+password +isActive');
    
    if (!administrator || !administrator.isActive) {
      return res.status(401).render('admin-login', { 
        error: 'Ungültige Anmeldedaten' 
      });
    }
    
    const isPasswordValid = await administrator.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).render('admin-login', { 
        error: 'Ungültige Anmeldedaten' 
      });
    }
    
    // Set session
    req.session.adminUser = {
      id: (administrator._id as any).toString(),
      email: administrator.email,
      name: administrator.name,
      role: administrator.role,
    };
    
    console.log('Admin logged in:', administrator.email);
    return res.redirect('/admin');
    
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).render('admin-login', { 
      error: 'Ein Fehler ist aufgetreten' 
    });
  }
};

export const logoutAdmin = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.clearCookie('connect.sid');
    res.redirect('/admin-login');
  });
};

export const showLoginForm = (req: Request, res: Response) => {
  if (req.session?.adminUser) {
    return res.redirect('/admin');
  }
  
  res.render('admin-login', { error: null });
};