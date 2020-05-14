import {SettingsProvider} from "../src/Settings/SettingsProvider";
import {FileReaderInterface} from "../src/Settings/interface/FileReaderInterface";

class FileReaderStub implements FileReaderInterface {
    private result = [''];
    readAll = (path: string): string[] => this.result;
    setResult = (result: string[]) => this.result = result;
}

describe('settingsProvider', () => {
    const fileReader = new FileReaderStub();
    let settingsProvider = new SettingsProvider(fileReader, '');

//     it('should single file parse Provider', () => {
//         const configs = [`
// a:
//     b:
//         - 1
//         - 2
//         `];
//
//         fileReader.setResult(configs)
//
//         expect(settingsProvider).toBeTruthy();
//
//         expect(settingsProvider.load()).toEqual({a: {b: [1, 2]}})
//     });

    it('should multiple file parse Provider', () => {
        const configs = [`
a: 
    b:
        - 1
        - 2
        `, `
s:
    b: 
        f: abc
a:
    c:
        g: g
        `,`
a:
    b:
        - 1
        - 3
        `];

        fileReader.setResult(configs)

        expect(settingsProvider).toBeTruthy();

        expect(settingsProvider.load()).toEqual({
            a: {
                b: [1, 2, 3],
                c: {g: 'g'}
            },
            s: {
                b:{
                    f: 'abc'
                }
            }
        })
    });
})
