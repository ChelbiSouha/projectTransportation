import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model'; // 👈 make sure path is correct
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  mode: 'view' | 'edit' | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(data => this.users = data);
  }

  selectUser(user: User, mode: 'view' | 'edit') {
    this.selectedUser = { ...user };
    this.mode = mode;
  }

  clearSelection() {
    this.selectedUser = null;
    this.mode = null;
  }

  saveUser() {
    if (this.selectedUser?.id) {
      this.userService.updateUser(this.selectedUser.id, this.selectedUser)
        .subscribe(() => this.loadUsers());
    }
    this.clearSelection();
  }

  blockUser(user: User) {
    if (user.id) {
      this.userService.blockUser(user.id).subscribe(() => this.loadUsers());
    }
  }
}
