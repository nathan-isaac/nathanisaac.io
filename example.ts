// Process Projects
// functional patterns - pure vs inprue functions

type Project = {
  id: string;
  name: string;
  createdAt: Date;
};

// Input, Request
// Output, Response
type UpdateProjectInput = {
  id: string;
  name: string;
};

// Gateway, Repository, Service, DataAccess, IO
interface ProjectGateway {
  fetchProjects(): Promise<Project[]>;
  updateProject(project: UpdateProjectInput): Promise<void>;
}

// CacheConnector, CacheGateway, CacheDriver, CacheAdapter
interface CacheGateway {
  get(key: string): Promise<string | null>;
  set(options: { key: string; value: string; expiresAt?: Date }): Promise<void>;
}

interface NotificationGateway {
  notify(message: string): Promise<void>;
}

class SlackNotification implements NotificationGateway {
  async notify(message: string): Promise<void> {
    // Implementation
  }
}

function createProjectGateway(options: {
  // prisma
  // redis
  // slack sdk
}): ProjectGateway {
  return {
    async fetchProjects(): Promise<Project[]> {
      // Implementation
      return [];
    },

    async sendSlackMessage(message: string): Promise<void> {
      // Implementation
    },

    async updateProject(project: UpdateProjectInput): Promise<void> {
      // Implementation
    },
  };
}

// by class or by function
class ProjectGatewayImpl implements ProjectGateway {
  async fetchProjects(): Promise<Project[]> {
    // Implementation
    return [];
  }

  async sendSlackMessage(message: string): Promise<void> {
    // Implementation
  }

  async updateProject(project: UpdateProjectInput): Promise<void> {
    // Implementation
  }
}
