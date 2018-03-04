import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

export const loaderSvgResources = (iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) => {
    const imgDir = 'assets';
    const sidebarDir = `${imgDir}/sidebar`;
    const dayDir = `${imgDir}/days`;
    const avatarDir = `${imgDir}/avatar`;
    const iconsDir = `${imgDir}/icons`;
    
    iconRegistry.addSvgIconSetInNamespace('avatars', sanitizer.bypassSecurityTrustResourceUrl(`${avatarDir}/avatars.svg`));
    iconRegistry.addSvgIcon('unassigned', sanitizer.bypassSecurityTrustResourceUrl(`${avatarDir}/unassigned.svg`));
    iconRegistry.addSvgIcon('day', sanitizer.bypassSecurityTrustResourceUrl(`${sidebarDir}/day.svg`));
    iconRegistry.addSvgIcon('month', sanitizer.bypassSecurityTrustResourceUrl(`${sidebarDir}/month.svg`));
    iconRegistry.addSvgIcon('project', sanitizer.bypassSecurityTrustResourceUrl(`${sidebarDir}/project.svg`));
    iconRegistry.addSvgIcon('projects', sanitizer.bypassSecurityTrustResourceUrl(`${sidebarDir}/projects.svg`));
    iconRegistry.addSvgIcon('week', sanitizer.bypassSecurityTrustResourceUrl(`${sidebarDir}/week.svg`));
    iconRegistry.addSvgIcon('move', sanitizer.bypassSecurityTrustResourceUrl(`${iconsDir}/move.svg`));
    iconRegistry.addSvgIcon('add', sanitizer.bypassSecurityTrustResourceUrl(`${iconsDir}/add.svg`));
    iconRegistry.addSvgIcon('delete', sanitizer.bypassSecurityTrustResourceUrl(`${iconsDir}/delete.svg`));

    const days = [];
    for(let i=1; i<32; i++) {
        days.push(i);
    }
    
    days.forEach(d => iconRegistry.addSvgIcon(`day${d}`, sanitizer.bypassSecurityTrustResourceUrl(`${dayDir}/day${d}.svg`)));
}