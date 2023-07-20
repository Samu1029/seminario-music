import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private menu: MenuController,
    private nvCtrl: NavController,
    private storage: Storage) { }

  ngOnInit() {
  }

  closeMenu() {
    this.menu.close();
  }

  loguot() {
    this.nvCtrl.navigateRoot("/login");
    this.storage.set("isUserLoggedIn", false);
  }

  intro() {
    this.nvCtrl.navigateRoot("/intro");
  }

}
