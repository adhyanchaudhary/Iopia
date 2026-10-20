import { test, expect, type Page } from '@playwright/test';

async function openLesson(page:Page,skip=true) {
 await page.goto('/');
 await page.getByRole('textbox',{name:'What do you want to understand today?'}).first().fill('Explain quantum entanglement');
 await page.getByRole('textbox',{name:'What do you want to understand today?'}).first().press('Enter');
 await expect(page.getByRole('heading',{name:'Explain quantum entanglement'})).toBeVisible();
 if(skip)await page.getByRole('button',{name:'Skip introduction'}).click();
 await expect(page.getByRole('heading',{name:'How neural networks bend space.'})).toBeVisible({timeout:7000});
 const pause=page.getByRole('button',{name:'Pause lesson',exact:true});
 if(await pause.count())await pause.click();
}

test('complete local demo: deterministic playback, lab, notes, tutor, quiz and replay',async({page})=>{
 const errors:string[]=[];const external:string[]=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:5174')&&!r.url().startsWith('data:'))external.push(r.url());});
 await openLesson(page,false);
 const seek=page.getByRole('slider',{name:'Lesson playback position'});
 await seek.fill('27');
 await expect(page.getByRole('heading',{name:'Meet nonlinearity.'})).toBeVisible();
 const frame=await page.locator('.lesson-render').innerHTML();
 await seek.fill('42');await expect(page.getByRole('heading',{name:'A new way to separate.'})).toBeVisible();
 await seek.fill('27');expect(await page.locator('.lesson-render').innerHTML()).toBe(frame);
 await page.getByRole('button',{name:'Play lesson',exact:true}).click();
 await page.waitForTimeout(500);
 await page.getByRole('button',{name:'Pause lesson',exact:true}).click();
 const paused=await seek.inputValue();
 await page.waitForTimeout(200);expect(await seek.inputValue()).toBe(paused);
 expect(Number(paused)).toBeGreaterThan(27);
 await page.getByRole('button',{name:'Hide captions',exact:true}).click();await expect(page.locator('.caption')).toHaveCount(0);
 await page.getByRole('button',{name:'Show captions',exact:true}).click();await expect(page.locator('.caption')).toBeVisible();
 await page.getByRole('combobox',{name:'Playback speed'}).selectOption('2');
 await page.getByRole('button',{name:'Restart lesson',exact:true}).click();
 await page.getByRole('button',{name:'Pause lesson',exact:true}).click();expect(Number(await seek.inputValue())).toBeLessThan(2);
 await page.getByRole('tab',{name:'Explore the Math',exact:true}).click();
 await page.getByRole('slider',{name:'Move through the function'}).fill('-2');
 await expect(page.locator('.lab-values')).toContainText('0.000');
 await page.getByRole('button',{name:'Sigmoid',exact:true}).click();await expect(page.locator('.lab-values')).toContainText('0.119');
 await page.getByRole('button',{name:'Tanh',exact:true}).click();await expect(page.locator('.lab-values')).toContainText('-0.964');
 await page.getByRole('tab',{name:'Notes',exact:true}).click();
 await page.getByRole('button',{name:'Save notes',exact:true}).click();expect(await page.evaluate(()=>localStorage.getItem('iopia-notes-saved'))).toBe('yes');
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'Download',exact:true}).click();expect((await download).suggestedFilename()).toBe('iopia-activation-functions.txt');
 await page.getByRole('button',{name:'What does ReLU do to negative inputs?',exact:true}).click();
 await expect(page.locator('.message.assistant').last()).toContainText('piecewise change',{timeout:10000});
 await page.getByRole('tab',{name:'Knowledge check',exact:true}).click();
 await page.getByRole('button',{name:'B To represent nonlinear relationships',exact:true}).click();
 await expect(page.getByText('Exactly right.',{exact:true})).toBeVisible();await page.getByRole('button',{name:'Next question'}).click();
 await page.getByRole('button',{name:'C 0',exact:true}).click();await page.getByRole('button',{name:'Next question'}).click();
 await page.getByRole('button',{name:'D You still get one affine transformation',exact:true}).click();await page.getByRole('button',{name:'See your result'}).click();
 await expect(page.getByText('3 of 3',{exact:true})).toBeVisible();
 await page.getByRole('tab',{name:'Lesson',exact:false}).click();await seek.fill('60');
 await expect(page.getByRole('button',{name:'Explore the transformation',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Replay lesson',exact:true}).click();await page.getByRole('button',{name:'Pause lesson',exact:true}).click();
 await page.getByRole('button',{name:'Replay intro',exact:true}).click();await expect(page.getByRole('button',{name:'Skip introduction'})).toBeVisible();
 expect(errors).toEqual([]);expect(external).toEqual([]);
});

test('mobile and reduced motion preserve navigation and all learning tools',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});
 await openLesson(page);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
 await expect(page.getByRole('button',{name:'Play lesson',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Toggle lesson navigation'}).click();
 await page.getByRole('button',{name:/03 Enter the activation/}).click();
 await expect(page.getByRole('heading',{name:'Meet nonlinearity.'})).toBeVisible();
 await page.getByRole('button',{name:'Ask Iopia',exact:true}).click();
 await page.getByRole('textbox',{name:'Ask a question about this lesson'}).fill('Why linear layers?');await page.getByRole('button',{name:'Send question'}).click();
 await expect(page.locator('.message.assistant').last()).toContainText('Composing affine maps');
 await page.getByRole('button',{name:'Close tutor'}).click();
 await page.getByRole('tab',{name:'Explore the Math',exact:true}).click();
 await expect(page.getByRole('slider',{name:'Move through the function'})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
});
