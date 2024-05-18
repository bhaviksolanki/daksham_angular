import { Injectable } from '@angular/core';
import { createClient, Entry, EntryCollection } from 'contentful';

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

  getProjects(): Promise<Entry<any>[]> {
    return this.client.getEntries({
      content_type: 'projects' // adjust based on your content type
    }).then(response => response.items);
  }

}
