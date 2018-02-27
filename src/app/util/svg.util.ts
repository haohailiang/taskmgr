import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

export const loaderSvgResources = (iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) => {
    iconRegistry.addSvgIcon('gifts', sanitizer.bypassSecurityTrustResourceUrl('assets/gifts.svg'));
}