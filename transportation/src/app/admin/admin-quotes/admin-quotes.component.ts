import { Component, OnInit } from '@angular/core';
import { Quote } from 'src/app/models/quote.model';
import { QuoteService } from 'src/app/services/quote.service';

@Component({
  selector: 'app-admin-quotes',
  templateUrl: './admin-quotes.component.html',
  styleUrls: ['./admin-quotes.component.css']
})
export class AdminQuotesComponent implements OnInit {
  quotes: Quote[] = [];

  constructor(private quoteService: QuoteService) {}

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes(): void {
    this.quoteService.getAllQuotes().subscribe({
      next: (data) => {
        this.quotes = data;
      },
      error: (err) => {
        console.error('Error fetching quotes:', err);
      }
    });
  }
}
