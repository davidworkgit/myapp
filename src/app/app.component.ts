import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myapp';
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list('listings');
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  addItem(newName: string): void {
    this.itemsRef.push({ bedrooms: newName });
  }

  updateItem(key: string, newText: string): void {
    this.itemsRef.update(key, { title: newText });
  }
  deleteItem(key: string): void {
    this.itemsRef.remove(key);
  }
  deleteEverything(): void {
    this.itemsRef.remove();
  }
}
