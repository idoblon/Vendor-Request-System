export type EmailType = 
  | 'order_confirmation'
  | 'order_status_update'
  | 'password_reset'
  | 'low_stock_alert'
  | 'welcome';

export interface EmailTemplate {
  type: EmailType;
  to: string;
  subject: string;
  body: string;
}

export interface EmailNotification {
  id: string;
  type: EmailType;
  to: string;
  subject: string;
  body: string;
  status: 'pending' | 'sent' | 'failed';
  createdAt: string;
  sentAt?: string;
}
