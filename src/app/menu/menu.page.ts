import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private menu: MenuController,
    private nvCtrl: NavController) { }

  ngOnInit() {
  }

  closeMenu() {
    this.menu.close();
  }

  loguot() {
    this.nvCtrl.navigateRoot("/login");
  }

}
