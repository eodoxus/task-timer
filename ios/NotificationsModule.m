#import <React/RCTLog.h>
#import "NotificationsModule.h"

@implementation NotificationsModule

RCT_EXPORT_MODULE(Notifications);

RCT_EXPORT_METHOD(requestPermission)
{
  RCTLogInfo(@"Requesting notification permission");
  
  // Get the notification center and add the request
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  [center requestAuthorizationWithOptions:(UNAuthorizationOptionAlert |
                                           UNAuthorizationOptionSound)
                        completionHandler:^(BOOL granted, NSError * _Nullable error) {
    if (granted) {
      RCTLogInfo(@"Notification authorization granted.");
    } else {
      RCTLogInfo(@"Notification authorization denied.");
    }
  }];
  
  RCTLogInfo(@"Finished requesting notification permission");
}

RCT_EXPORT_METHOD(scheduleNotification:(NSString *)message secondsFromNow:(NSInteger)secondsFromNow)
{
  RCTLogInfo(@"Scheduling notification '%@' in %ld sec", message, (long)secondsFromNow);
  
  // Get the notification center and add the request
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  [center requestAuthorizationWithOptions:(UNAuthorizationOptionAlert |
                                           UNAuthorizationOptionSound)
                        completionHandler:^(BOOL granted, NSError * _Nullable error) {
    if (granted) {
      RCTLogInfo(@"Notification authorization granted.");
      
      // Create notification content
      UNMutableNotificationContent *content = [[UNMutableNotificationContent alloc] init];
      content.title = @"Bubble Timer";
      content.body = message;
      content.sound = [UNNotificationSound soundNamed:@"tinkerBell.mp3"];
      
      // Create a trigger with the calculated date
      UNTimeIntervalNotificationTrigger *trigger = [UNTimeIntervalNotificationTrigger
                                                    triggerWithTimeInterval:secondsFromNow
                                                                    repeats:NO];
      // Create a notification request
      UNNotificationRequest *request = [UNNotificationRequest requestWithIdentifier:@"BubbleTimerNotification"
                        content:content
                        trigger:trigger];
      // Add the request
      [center addNotificationRequest:request withCompletionHandler:^(NSError * _Nullable error) {
        if (error) {
          RCTLogInfo(@"Error requesting notification: %@", error);
        } else {
          RCTLogInfo(@"Notification requested successfully.");
        }
      }];
    } else {
      RCTLogInfo(@"Notification authorization denied.");
    }
  }];
  
  RCTLogInfo(@"Scheduled notification");
}

@end

