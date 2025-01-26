

export type Email = {
  id: string;
  subject: string;
  sender: string;
  preview: string;
  date: Date;
  needsResponse: boolean;
};

export type CalendarEvent = {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  attendees: string[];
  location?: string;
  needsResponse: boolean;
};

export const mockEmails: Email[] = [
  {
    id: "1",
    subject: "Q4 Marketing Campaign Review",
    sender: "sarah@acme.org",
    preview:
      "Hi Ivan,\n\nI've reviewed the preliminary results from our Q4 marketing campaign, and I'd like to schedule a meeting to discuss our key findings. The data shows some interesting trends, particularly in social media engagement metrics. Are you available this Thursday at 2 PM for a 45-minute review session? I'll prepare a brief presentation highlighting the main takeaways.\n\nBest regards,\nSarah",
    date: new Date("2025-01-15T09:30:00"),
    needsResponse: true,
  },
  {
    id: "2",
    subject: "Project Phoenix Timeline Update",
    sender: "jason@acme.org",
    preview:
      "Ivan,\n\nI wanted to give you a heads up about some changes to the Project Phoenix timeline. Our development team has identified technical challenges that could push our launch date back by approximately two weeks. Could we meet tomorrow morning to discuss the impact on your team's deliverables? I think we can minimize disruption if we act quickly.\n\nBest,\nJason",
    date: new Date("2025-01-16T14:45:00"),
    needsResponse: true,
  },
  {
    id: "3",
    subject: "Re: Q4 Marketing Campaign Review",
    sender: "sarah@acme.org",
    preview:
      "Hi Ivan,\n\nJust following up on the Q4 campaign review meeting request. I've prepared some preliminary slides highlighting our key wins and areas for improvement. Let me know if Thursday still works for you, or we can look at alternative times.\n\nBest,\nSarah",
    date: new Date("2025-01-17T11:20:00"),
    needsResponse: true,
  },
];

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Q4 Marketing Campaign Review",
    startTime: new Date("2025-01-18T14:00:00"),
    endTime: new Date("2025-01-18T15:00:00"),
    location: "Conference Room A",
    attendees: ["ivan@acme.org", "sarah@acme.org", "jason@acme.org"],
    description:
      "Review of Q4 marketing campaign results and social media metrics",
    organizer: "ivan@acme.org",
  },
  {
    id: "2",
    title: "Project Phoenix Status Update",
    startTime: new Date("2025-01-17T10:00:00"),
    endTime: new Date("2025-01-17T11:00:00"),
    location: "Virtual Meeting",
    attendees: ["ivan@acme.org", "jason@acme.org", "dev.team@acme.org"],
    description: "Discussion of timeline adjustments and technical challenges",
    organizer: "jason@acme.org",
  },
  {
    id: "3",
    title: "Weekly Team Sync",
    startTime: new Date("2025-01-19T09:30:00"),
    endTime: new Date("2025-01-19T10:30:00"),
    location: "Conference Room B",
    attendees: ["ivan@acme.org", "team@acme.org"],
    description: "Regular team sync meeting - Project updates and priorities",
    organizer: "ivan@acme.org",
  },
  {
    id: "4",
    title: "Client Presentation Prep",
    startTime: new Date("2025-01-17T15:00:00"),
    endTime: new Date("2025-01-17T16:00:00"),
    location: "Meeting Room 2",
    attendees: ["ivan@acme.org", "sarah@acme.org"],
    description: "Preparation for upcoming client presentation on new features",
    organizer: "sarah@acme.org",
  },
  {
    id: "5",
    title: "1:1 with Jason",
    startTime: new Date("2025-01-20T13:00:00"),
    endTime: new Date("2025-01-20T13:30:00"),
    location: "Jason's Office",
    attendees: ["ivan@acme.org", "jason@acme.org"],
    description: "Monthly catch-up and progress review",
    organizer: "ivan@acme.org",
  },
];
