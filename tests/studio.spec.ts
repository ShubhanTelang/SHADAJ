import {test,expect} from '@playwright/test';
test('guest can generate, listen and download a real alaap',async({page})=>{
 await page.goto('/');await page.getByRole('link',{name:'Start creating'}).click();
 await expect(page.getByRole('button',{name:'Bhairav',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Generate alaap'}).click();
 await expect(page.getByRole('heading',{name:'Take a moment. Listen.'})).toBeVisible({timeout:120000});
 await expect(page.getByRole('link',{name:'WAV',exact:true})).toBeVisible();
 await page.getByRole('button',{name:/Quality & grammar/}).click();
 await expect(page.getByRole('heading',{name:'Clarity behind the creation.'})).toBeVisible();
});
test('mobile navigation and settings',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');
 await page.getByRole('button',{name:'Toggle navigation'}).click();
 await page.getByRole('link',{name:'Settings',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Your preferences.'})).toBeVisible();
 await page.getByLabel('Theme',{exact:true}).selectOption('dark');
 await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
