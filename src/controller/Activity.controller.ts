import api from '../Api/api';
import { format } from 'date-fns';

export interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  user_id?: string;
  user_name?: string;
  entity_id?: string;
  entity_name?: string;
  metadata?: Record<string, any>;
  created_at: string;
  icon: string;
}

export interface ActivityCreate {
  type: string;
  title: string;
  description: string;
  user_id?: string;
  user_name?: string;
  entity_id?: string;
  entity_name?: string;
  metadata?: Record<string, any>;
  icon?: string;
}

export interface ActivityFilters {
  limit?: number;
  days_back?: number;
}

export interface FormattedActivity {
  text: string;
  time: string;
  icon: string;
}

export interface ActivityStats {
  [key: string]: number;
}

export interface CleanupResponse {
  message: string;
  deleted_count: number;
}

type FilterType = 'day' | 'week' | 'month' | 'year';

class ActivityController {
  private baseUrl = '/';

  async getActivities(filters: ActivityFilters = {}): Promise<Activity[]> {
    try {
      const params = new URLSearchParams();
      
      if (filters.limit) {
        params.append('limit', filters.limit.toString());
      }
      
      if (filters.days_back) {
        params.append('days_back', filters.days_back.toString());
      }

      const response = await api.get(`${this.baseUrl}?${params.toString()}`);
      
      if (response.data && Array.isArray(response.data)) {
        return response.data.map(this.transformActivity);
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw new Error('Failed to fetch activities');
    }
  }

  async getRecentActivities(limit: number = 10): Promise<Activity[]> {
    try {
      const response = await api.get(`${this.baseUrl}/recent?limit=${limit}`);
      
      if (response.data && Array.isArray(response.data)) {
        return response.data.map(this.transformActivity);
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching recent activities:', error);
      throw new Error('Failed to fetch recent activities');
    }
  }

  async getActivitiesByTimeFilter(filter: FilterType): Promise<Activity[]> {
    const daysMap = {
      day: 1,
      week: 7,
      month: 30,
      year: 365
    };

    return this.getActivities({ 
      days_back: daysMap[filter],
      limit: 50 
    });
  }

  async createActivity(activityData: ActivityCreate): Promise<Activity> {
    try {
      const response = await api.post(this.baseUrl, activityData);
      return this.transformActivity(response.data);
    } catch (error) {
      console.error('Error creating activity:', error);
      throw new Error('Failed to create activity');
    }
  }

  async getActivityStats(): Promise<ActivityStats> {
    try {
      const response = await api.get(`${this.baseUrl}/stats`);
      return response.data || {};
    } catch (error) {
      console.error('Error fetching activity stats:', error);
      return {};
    }
  }

  async cleanupOldActivities(): Promise<CleanupResponse> {
    try {
      const response = await api.delete(`${this.baseUrl}/cleanup`);
      return response.data;
    } catch (error) {
      console.error('Error cleaning up activities:', error);
      throw new Error('Failed to cleanup old activities');
    }
  }

  private transformActivity(activity: any): Activity {
    return {
      id: activity.id,
      type: activity.type,
      title: activity.title,
      description: activity.description,
      user_id: activity.user_id,
      user_name: activity.user_name,
      entity_id: activity.entity_id,
      entity_name: activity.entity_name,
      metadata: activity.metadata || {},
      created_at: activity.created_at,
      icon: activity.icon || 'bell'
    };
  }

  private parseCreatedAt(createdAtString: string): Date {
    try {
      console.log('Original created_at from database:', createdAtString);
      
      let dateString = createdAtString;
      
      if (dateString.includes(' ') && !dateString.includes('T')) {
        dateString = dateString.replace(' ', 'T');
        if (!dateString.includes('Z') && !dateString.includes('+') && !dateString.includes('-')) {
          dateString += 'Z';
        }
      }
      
      if (dateString.includes('T') && !dateString.includes('Z') && !dateString.includes('+') && !dateString.includes('-')) {
        dateString += 'Z';
      }
      
      const parsedDate = new Date(dateString);
      
      if (isNaN(parsedDate.getTime())) {
        throw new Error(`Invalid date: ${createdAtString}`);
      }
      
      console.log('Parsed date:', parsedDate.toISOString());
      return parsedDate;
    } catch (error) {
      console.error('Error parsing created_at:', error);
      console.error('Original value:', createdAtString);
      return new Date();
    }
  }

  formatTimeAgo(createdAtString: string): string {
    try {
      const now = new Date();
      const activityDate = this.parseCreatedAt(createdAtString);
      
      const diffInMs = now.getTime() - activityDate.getTime();
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      console.log('Time calculation:', {
        now: now.toISOString(),
        activityDate: activityDate.toISOString(),
        diffInMs,
        diffInMinutes,
        diffInHours,
        diffInDays
      });

      if (diffInMinutes < 1) {
        return 'Just now';
      } else if (diffInMinutes < 60) {
        return `${diffInMinutes} min ago`;
      } else if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
      } else if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
      } else {
        return activityDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: activityDate.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
      }
    } catch (error) {
      console.error('Error formatting time ago:', error);
      return 'Unknown time';
    }
  }

  formatActivityForDisplay(activity: Activity): FormattedActivity {
    try {
      const activityDate = this.parseCreatedAt(activity.created_at);
      
      // Use date-fns for better formatting
      const formattedTime = format(activityDate, 'MMM dd, yyyy HH:mm');
      
      return {
        text: activity.description || activity.title,
        time: formattedTime,
        icon: activity.icon || 'bell'
      };
    } catch (error) {
      console.error('Error formatting activity:', error);
      return {
        text: activity.description || activity.title || 'Unknown activity',
        time: this.formatTimeAgo(activity.created_at),
        icon: activity.icon || 'bell'
      };
    }
  }

  // Utility methods for common activity operations
  async getActivitiesForUser(userId: string, limit: number = 20): Promise<Activity[]> {
    try {
      const activities = await this.getActivities({ limit: 100 });
      return activities.filter(activity => activity.user_id === userId).slice(0, limit);
    } catch (error) {
      console.error('Error fetching user activities:', error);
      throw new Error('Failed to fetch user activities');
    }
  }

  async getActivitiesByType(type: string, limit: number = 20): Promise<Activity[]> {
    try {
      const activities = await this.getActivities({ limit: 100 });
      return activities.filter(activity => activity.type === type).slice(0, limit);
    } catch (error) {
      console.error('Error fetching activities by type:', error);
      throw new Error('Failed to fetch activities by type');
    }
  }

  // Helper method to create different types of activities
  async createUserActivity(
    type: string,
    title: string,
    description: string,
    userId: string,
    userName: string,
    metadata?: Record<string, any>
  ): Promise<Activity> {
    const activityData: ActivityCreate = {
      type,
      title,
      description,
      user_id: userId,
      user_name: userName,
      metadata,
      icon: this.getIconForActivityType(type)
    };

    return this.createActivity(activityData);
  }

  async createEntityActivity(
    type: string,
    title: string,
    description: string,
    entityId: string,
    entityName: string,
    metadata?: Record<string, any>
  ): Promise<Activity> {
    const activityData: ActivityCreate = {
      type,
      title,
      description,
      entity_id: entityId,
      entity_name: entityName,
      metadata,
      icon: this.getIconForActivityType(type)
    };

    return this.createActivity(activityData);
  }

  private getIconForActivityType(type: string): string {
    const iconMap: Record<string, string> = {
      'login': 'user',
      'logout': 'log-out',
      'create': 'plus',
      'update': 'edit',
      'delete': 'trash',
      'view': 'eye',
      'download': 'download',
      'upload': 'upload',
      'share': 'share',
      'comment': 'message-circle',
      'like': 'heart',
      'follow': 'user-plus',
      'unfollow': 'user-minus',
      'notification': 'bell',
      'error': 'alert-circle',
      'warning': 'alert-triangle',
      'success': 'check-circle',
      'info': 'info'
    };

    return iconMap[type] || 'bell';
  }
}

export const activityController = new ActivityController();

// Export convenience functions
export const fetchActivities = (filters?: ActivityFilters) => 
  activityController.getActivities(filters);

export const fetchRecentActivities = (limit?: number) => 
  activityController.getRecentActivities(limit);

export const createActivity = (activityData: ActivityCreate) =>
  activityController.createActivity(activityData);

export const fetchActivityStats = () =>
  activityController.getActivityStats();

export const cleanupOldActivities = () =>
  activityController.cleanupOldActivities();

export default activityController;