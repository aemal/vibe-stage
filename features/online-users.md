# Online User Presence and Live Chat Wall

## Feature Overview
This feature provides a real-time display of online participants at a conference or workshop, showing their geographic location with country flags, usernames, and activity levels. It includes a public chat box where messages appear in a conference-friendly large format on big screens.

## User Story
**As a conference organizer and attendee,**  
**I want** to see who is participating remotely with their geographic location and enable them to chat publicly,  
**So that** we can create a sense of global presence and enable instant communication between remote and in-person participants.

## Technical Requirements

### User Join Flow
- Simple username entry form (no registration required)
- Automatic country detection from browser location
- Display of country flag alongside username
- Firebase Realtime Database integration for instant updates

### User Presence Board
- Real-time list of all currently online users
- Each user entry displays:
  - Username
  - Country flag
  - Activity meter (GitHub-style contribution graph)
- Activity level based on number of chat messages sent
- Clean, modern UI optimized for both personal devices and large projection screens

### Live Chat Wall
- Public chat box accessible to all participants
- Messages displayed with:
  - Username
  - Country flag
  - Timestamp
  - Message content with emoji support
- Big, readable font for conference projection
- Smooth CSS animations for new messages
- No message history limitation (all messages visible)

### Activity Metering
- Visual representation of user engagement
- GitHub-style activity blocks (more active = more green blocks)
- Algorithm: 1-5 messages (light green), 6-10 messages (medium green), 11+ messages (dark green)

## UI/UX Specifications

### Layout
- Left side: User presence board with flags and activity meters
- Right side: Live chat wall with large, readable messages
- Responsive design that works on both personal devices and large projection screens

### Styling
- Clean, minimal interface with high contrast for readability
- Large font sizes for projection visibility
- Smooth animations for new users joining and new messages
- Country flags displayed in circular avatars
- Activity meters with green gradient blocks

### Performance Considerations
- Optimize for minimal lag on message display
- Handle potentially hundreds of concurrent users
- Efficient rendering of activity meters

## Implementation Notes

### Firebase Configuration
- Use Firebase Realtime Database for user presence
- Implement listener for new messages and user status changes
- Set up security rules that allow public access but prevent abuse

### Browser Features
- Implement geolocation API for country detection
- Fallback mechanism if location services are denied
- Local storage to remember username for returning users

### Projection Mode
- Special toggle for conference/big screen mode
- Increased font sizes and simplified UI for visibility

## Success Metrics
- Number of remote participants using the system
- Message engagement rate
- Geographic diversity of participation

## Accessibility Considerations
- High contrast text for readability
- Screen reader compatibility
- Alternative text for country flags

This feature will create a seamless bridge between remote and in-person participants, fostering a truly global and interactive conference experience without requiring complex user registration.
