import { Component, OnInit } from "@angular/core";

@Component({
  selector: "[app-footer]",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit {
  langs: [{ name: "English"; lang: "en" }, { name: "Tiếng Việt"; lang: "vi" }];
  defaultValue = "en";
  constructor() {}

  ngOnInit() {}
}
