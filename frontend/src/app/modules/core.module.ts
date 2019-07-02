import { NgModule} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import "hammerjs";


@NgModule({
  imports: [BrowserAnimationsModule, FlexLayoutModule],
  exports: [BrowserAnimationsModule, FlexLayoutModule]
})

export class CoreModule {}
