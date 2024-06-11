import { Injectable } from '@angular/core';
import { createClient, Entry, EntryCollection } from 'contentful';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  constructor() { }

  //Creating and connecting to Contentful portal
  private client = createClient({
    space: '33lr6dgc9bli',
    accessToken: 'qr7fXJPSUNtRxNOKwbYM6WwxcJHeJ7_nxqZvmQ7F2PU'
  });

  getAllEntries() {
    const entry = this.client.getEntry('4rw7iySqVK641Utmd2Fpck');
    console.log(entry)
    this.client.getEntries().then(entries => console.log(entries));
  }

  //Get Entry for Home Page Welcome Model
  getEntryForId(entryId: string): Promise<Entry<any>> {
    return this.client.getEntry(entryId);
  }

  getProjects() {
    const projects = this.client.getEntries({
      content_type: 'projects' // adjust based on your content type
    }).then(response => response.items);
    return from(projects);
  }

  getProjectById(projectId: string) {
    const projectData = this.client.getEntry(projectId);
    console.log(projectData);
    return from(projectData);
  }

  getAllCustomerReviews() {
    const customerReviews = this.client.getEntries({
      content_type: 'customerReview'
    }).then(response => response.items);
    return from(customerReviews);
  }

}
