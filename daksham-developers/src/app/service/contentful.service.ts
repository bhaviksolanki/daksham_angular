import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  constructor() { }

  private client = createClient({
    space: 'w57gzb4qgj5k',
    accessToken: 'QVX5ptM_aUuGlBN4jlft5f-rtseGVGc-cXEJ5QJhLBc'
  });

  getAllEntries() {
    const entry = this.client.getEntry('2GmpBHtA2FqsvuSoXe6Ebm');
    console.log(entry)
    this.client.getEntries().then(entries => console.log(entries));
  }

}
