import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Connection, WorkflowClient } from '@temporalio/client';

@Injectable()
export class TemporalService implements OnModuleInit, OnModuleDestroy {
  private connection: Connection;
  public client: WorkflowClient;

  async onModuleInit() {
    // Create a connection to the Temporal server
    this.connection = await Connection.connect();

    // Initialize the Workflow client
    this.client = new WorkflowClient({ connection: this.connection });
  }

  async onModuleDestroy() {
    // Close the connection when the module is destroyed
    await this.connection.close();
  }
}
