import { EmailNotification, EmailType } from '../types/email';
import { Order } from '../types/order';
import { Product } from '../types/product';

const STORAGE_KEY = 'vrs_email_notifications';

const getStoredEmails = (): EmailNotification[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveEmails = (emails: EmailNotification[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(emails));
};

const createEmailNotification = (
  type: EmailType,
  to: string,
  subject: string,
  body: string
): EmailNotification => {
  return {
    id: Date.now().toString(),
    type,
    to,
    subject,
    body,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
};

export const emailService = {
  // Send order confirmation email
  sendOrderConfirmation: async (order: Order): Promise<void> => {
    const subject = `Order Confirmation #${order.id}`;
    const body = `
      Dear ${order.customerName},
      
      Thank you for your order!
      
      Order ID: #${order.id}
      Total Amount: $${order.totalAmount.toFixed(2)}
      Status: ${order.status}
      
      Items:
      ${order.items.map(item => `- ${item.productName} x${item.quantity} - $${item.price.toFixed(2)}`).join('\n')}
      
      We'll notify you when your order status changes.
      
      Best regards,
      VRS Team
    `;

    const email = createEmailNotification('order_confirmation', order.customerEmail, subject, body);
    const emails = getStoredEmails();
    emails.push(email);
    saveEmails(emails);

    // Simulate email sending
    setTimeout(() => {
      email.status = 'sent';
      email.sentAt = new Date().toISOString();
      saveEmails(emails);
    }, 1000);
  },

  // Send order status update email
  sendOrderStatusUpdate: async (order: Order, oldStatus: string): Promise<void> => {
    const subject = `Order #${order.id} Status Updated`;
    const body = `
      Dear ${order.customerName},
      
      Your order status has been updated.
      
      Order ID: #${order.id}
      Previous Status: ${oldStatus}
      New Status: ${order.status}
      
      ${order.status === 'completed' ? 'Your order has been completed. Thank you for your business!' : ''}
      ${order.status === 'cancelled' ? 'Your order has been cancelled. If you have questions, please contact us.' : ''}
      
      Best regards,
      VRS Team
    `;

    const email = createEmailNotification('order_status_update', order.customerEmail, subject, body);
    const emails = getStoredEmails();
    emails.push(email);
    saveEmails(emails);

    setTimeout(() => {
      email.status = 'sent';
      email.sentAt = new Date().toISOString();
      saveEmails(emails);
    }, 1000);
  },

  // Send password reset email
  sendPasswordReset: async (email: string, resetToken: string): Promise<void> => {
    const subject = 'Password Reset Request';
    const body = `
      Hello,
      
      You requested to reset your password.
      
      Reset Token: ${resetToken}
      
      If you didn't request this, please ignore this email.
      
      Best regards,
      VRS Team
    `;

    const emailNotification = createEmailNotification('password_reset', email, subject, body);
    const emails = getStoredEmails();
    emails.push(emailNotification);
    saveEmails(emails);

    setTimeout(() => {
      emailNotification.status = 'sent';
      emailNotification.sentAt = new Date().toISOString();
      saveEmails(emails);
    }, 1000);
  },

  // Send low stock alert
  sendLowStockAlert: async (product: Product, adminEmail: string): Promise<void> => {
    const subject = `Low Stock Alert: ${product.name}`;
    const body = `
      Alert: Low Stock Warning
      
      Product: ${product.name}
      Current Stock: ${product.stock}
      Category: ${product.category}
      
      Please reorder this product soon.
      
      VRS System
    `;

    const email = createEmailNotification('low_stock_alert', adminEmail, subject, body);
    const emails = getStoredEmails();
    emails.push(email);
    saveEmails(emails);

    setTimeout(() => {
      email.status = 'sent';
      email.sentAt = new Date().toISOString();
      saveEmails(emails);
    }, 1000);
  },

  // Send welcome email
  sendWelcomeEmail: async (name: string, email: string): Promise<void> => {
    const subject = 'Welcome to VRS!';
    const body = `
      Dear ${name},
      
      Welcome to Vendor Request System!
      
      Your account has been successfully created.
      
      You can now:
      - Manage products
      - Track orders
      - View analytics
      - And much more!
      
      If you have any questions, feel free to contact us.
      
      Best regards,
      VRS Team
    `;

    const emailNotification = createEmailNotification('welcome', email, subject, body);
    const emails = getStoredEmails();
    emails.push(emailNotification);
    saveEmails(emails);

    setTimeout(() => {
      emailNotification.status = 'sent';
      emailNotification.sentAt = new Date().toISOString();
      saveEmails(emails);
    }, 1000);
  },

  // Get all email notifications
  getAll: async (): Promise<EmailNotification[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getStoredEmails()), 300);
    });
  },

  // Get emails by type
  getByType: async (type: EmailType): Promise<EmailNotification[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const emails = getStoredEmails();
        resolve(emails.filter(e => e.type === type));
      }, 300);
    });
  },

  // Clear all notifications
  clearAll: async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem(STORAGE_KEY);
        resolve();
      }, 300);
    });
  },
};
