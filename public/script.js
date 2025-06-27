const codeEditor = document.getElementById('code-editor');
        const inputPanel = document.getElementById('input-panel');
        const outputPanel = document.getElementById('output-panel');
        const runBtn = document.getElementById('run-btn');
        const languageSelect = document.getElementById('language-select');
        const snippetSelect = document.getElementById('snippet-select');
        const insertSnippetBtn = document.getElementById('insert-snippet-btn');
        const notification = document.getElementById('notification');
        const notificationMessage = document.getElementById('notification-message');
        
        // --- Data ---
        const PISTON_API_URL = "https://emkc.org/api/v2/piston/execute";
        
        const LANGUAGE_CONFIG = {
            cpp: { version: "10.2.0", file: "main.cpp" },
            java: { version: "15.0.2", file: "Main.java" },
            python: { version: "3.10.0", file: "main.py" },
            javascript: { version: "18.15.0", file: "main.js" }
        };

        const TEMPLATE_PLACEHOLDERS = {
            cpp: `#include <iostream>\n\nint main() {\n    // Your C++ code here\n    std::cout << "Hello, World!";\n    return 0;\n}`,
            java: `public class Main {\n    public static void main(String[] args) {\n        // Your Java code here\n        System.out.println("Hello, World!");\n    }\n}`,
            python: `# Your Python code here\nprint("Hello, World!")`,
            javascript: `// Your JavaScript code here\nconsole.log("Hello, World!");`
        };


        let cmEditor;

    document.addEventListener('DOMContentLoaded', () => {
        initializeEditor();
        
        // Initialize CodeMirror
        cmEditor = CodeMirror(document.getElementById('code-mirror-editor'), {
            value: codeEditor.value, // load existing code
            mode: 'text/x-c++src',
            theme: 'dracula',
            lineNumbers: true,
            tabSize: 4,
            indentUnit: 4,
            indentWithTabs: true,
            matchBrackets: true,
            autoCloseBrackets: true
        });

        // Save back to the hidden textarea for your existing logic
        cmEditor.on('change', () => {
            codeEditor.value = cmEditor.getValue();
        });
    });


        const SNIPPETS = {
            cpp: {
                "CP Full": `/*\nAuthor : LazyWizard(Md.Nafiul Haque)\n"Success is not final,\n failure is not fatal: \n it is the courage to continue that counts."\n  - Winston Churchill\n*/\n#include<bits/stdc++.h>\n#include <ext/pb_ds/assoc_container.hpp>\nusing namespace __gnu_pbds;\nusing namespace std;\n#ifndef _GLIBCXX_NO_ASSERT\n#include<cassert>\n#endif\n//it for C++11 standard or later is supported by the compiler.\n#if __cplusplus >= 201103L\n#include <ccomplex>\n#include <cfenv>\n#include <cinttypes>\n//#include <cstdalign>\n#include <cstdbool>\n#include <cstdint>\n#include <ctgmath>\n//#include <cuchar>\n#endif\n// Declaring Ordered Set\ntypedef tree<int, null_type, less<int>, rb_tree_tag,tree_order_statistics_node_update>pbds;\ntypedef vector<int> vi;\ntypedef vector<pair<int,int>> vpi;\ntypedef pair<int,int> pi;\n\n#define     INF 1000000000000000007\n#define     pii 3.14159265358979323846264338327\n#define     modd 100010\n#define fb find_by_order\n#define ok order_of_key\n#define mem(x,y) memset(x,y,sizeof x)//set arr x to value y for all element ;\n#define endl        "\\n"\n#define int         long long int\n#define pb          push_back\n#define pf          push_front\n#define F           first\n#define S           second\n#define mp          midpoint\n#define READ(x)     freopen(x,"r",stdin)\n#define WRITE(x)    freopen(x,"w",stdout)\n#define BOOST       ios_base::sync_with_stdio(false);cin.tie(NULL);cout.tie(NULL)\n#define chk         printf("Came Here!!!!!!!!!!!!!!!\\n")\n#define bug(...) __f (#__VA_ARGS__,__VA_ARGS__)\n#define printi(v) for(auto i : v) cout<<i<<" "; cout<<endl;\n#define printj(v) for(auto j : v) cout<<j<<" "; cout<<endl;\n#define printk(v) for(auto k : v) cout<<k<<" "; cout<<endl;\n#define fr(i,n)     for(int i=0; i<(n); i++)\n#define rep(i,a,n)  for(int i=(a);i<=(n);i++)\n#define fat(n)      for(auto x:n)\n#define srt(v)      sort(v.begin(),v.end())\n#define all(v)      v.begin(),v.end()\n#define mxe(v)      *max_element(all(v))// find max element in vector\n#define mne(v)      *min_element(all(v))// find min element in vector\n#define unq(v)  v.resize(distance(v.begin(), unique(v.begin(), v.end())));// remove all duplicate from vector\n#define YES         cout<<"YES"<<endl;\n#define NO           cout<<"NO"<<endl;\n#define dec_srt(v)  sort(all(v));//desending sort\n#define sum(v)      accumulate(all(v), 0LL); \n//make sure to sort before use unq\n\ntemplate<typename typC,typename typD> istream &operator>>(istream &cin,pair<typC,typD> &a) { return cin>>a.first>>a.second; }\ntemplate<typename typC> istream &operator>>(istream &cin,vector<typC> &a) { for (auto &x:a) cin>>x; return cin; }\ntemplate<typename typC,typename typD> ostream &operator<<(ostream &cout,const pair<typC,typD> &a) { return cout<<a.first<<\' \'<<a.second; }\ntemplate<typename typC,typename typD> ostream &operator<<(ostream &cout,const vector<pair<typC,typD>> &a) { for (auto &x:a) cout<<x<<\'\\n\'; return cout; }\ntemplate<typename typC> ostream &operator<<(ostream &cout,const vector<typC> &a) { int n=a.size(); if (!n) return cout; cout<<a[0]; for (int i=1; i<n; i++) cout<<\' \'<<a[i]; return cout; }\n\nvoid modadd(int &a , int b) {a=((a%modd)+(b%modd))%modd;}\nvoid modsub(int &a , int b) {a=((a%modd)-(b%modd)+modd)%modd;}\nvoid modmul(int &a , int b) {a=((a%modd)*(b%modd))%modd;}\n\ninline int modmul(int a,int b,int mod){int ans =0;a=a%mod;\n    while (b>0){if(b%2)ans=(ans%mod + a%mod)%mod;a=(a%mod * 2%mod)%mod;b/=2;}\n    return ans%mod;}\n// rounds up the division\nint rup(int ik,int ikk){if(ik%ikk==0) return ik/ikk;else return (ik/ikk)+1;}\nint gcd(int a,int b){if(b==0) return a;return gcd(b,a%b);}\nint getarraygcd(int a[],int n){int ans=a[0];\n    for(int i=0;i<=n-1;i++){if(a[i]==0){continue;}ans=__gcd(ans,a[i]);}return ans;}\nint lcm(int a, int b){return (a*b)/gcd(a,b);}\nint modpow(int x1,int n1,int m1){if (n1 == 0) return 1%m1;int u1 = modpow(x1,n1/2,m1);u1 = (u1*u1)%m1;\n    if (n1%2 == 1) u1 = (u1*x1)%m1;return u1;}\nint npow(int a,int b){if(b==0) return 1;int c=npow(a,b/2);int u=c*c;\n    if(b%2==1)u*=a;return u;}\n//provide a fast, non-cryptographic hash \n// struct boost{\n//   static uint64_t splitmix64(uint64_t x) {\n//        x += 0x9e3779b97f4a7c15;\n//        x = (x ^ (x >> 30)) * 0xbf58476d1ce4e5b9;\n//        x = (x ^ (x >> 27)) * 0x94d049bb133111eb;\n//        return x ^ (x >> 31);\n//      }\n\n//      size_t operator()(uint64_t x) const {\n//        static const uint64_t FIXED_RANDOM = chrono::steady_clock::now().time_since_epoch().count();\n//        return splitmix64(x + FIXED_RANDOM);\n//      }\n// };\n\nvoid solve(){\n   int n ;cin>>n;\n   \n}\n\nint32_t main(){\n    BOOST;\n  /*  #ifndef ONLINE_JUDGE\n    READ("input.txt");\n    WRITE("output.txt");\n    #endif\n */   clock_t z = clock();\n    int t=1;\n    cin>>t;\n    while (t--){solve();}\n   /* cerr << "\\nRun Time : " << ((double)(clock() - z) / CLOCKS_PER_SEC);\n */   return 0;\n}`,
                "Cp Normal": "for (int i = 0; i < n; ++i) {\n\n}",
                "Simple": "#include <vector>\nstd::vector<int> v;",
            },
            java: {
                "Scanner Input": "import java.util.Scanner;\nScanner sc = new Scanner(System.in);",
                "BufferedReader": "import java.io.BufferedReader;\nimport java.io.InputStreamReader;\nBufferedReader br = new BufferedReader(new InputStreamReader(System.in));",
                "ArrayList": "import java.util.ArrayList;\nArrayList<String> list = new ArrayList<>();"
            },
            python: {
                "Read line": "import sys\nline = sys.stdin.readline().strip()",
                "List Comprehension": "[x for x in range(10)]",
                "Dictionary": "my_dict = {}",
            },
            javascript: {
                "Arrow Function": "const myFunction = () => {\n\n};",
                "Fetch API": "fetch('https://api.example.com/data')\n  .then(response => response.json())\n  .then(data => console.log(data));",
                "Map Array": "const newArray = oldArray.map(item => item * 2);"
            }
        };

        // --- Core Functions ---

        /**
         * Executes the code using the Piston API.
         */
        async function runCode() {
            const lang = languageSelect.value;
            const code = codeEditor.value;
            const input = inputPanel.value;
            
            if (!code.trim()) {
                showNotification("Code is empty!", 'error');
                return;
            }

            outputPanel.textContent = "Executing...";
            outputPanel.classList.remove('error');
            runBtn.disabled = true;
            runBtn.classList.add('opacity-50', 'cursor-not-allowed');

            try {
                const config = LANGUAGE_CONFIG[lang];
                const payload = {
                    language: lang,
                    version: config.version,
                    files: [
                        {
                            name: config.file,
                            content: code
                        }
                    ],
                    stdin: input
                };

                const response = await fetch(PISTON_API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                
                const result = await response.json();

                if (result.run.stderr) {
                    outputPanel.textContent = result.run.stderr;
                    outputPanel.classList.add('error');
                } else {
                    outputPanel.textContent = result.run.stdout;
                }

            } catch (error) {
                outputPanel.textContent = `An error occurred: ${error.message}\nPlease try again later.`;
                outputPanel.classList.add('error');
            } finally {
                runBtn.disabled = false;
                runBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }

        function saveTemplate(templateId) {
            const code = codeEditor.value;
            if (!code.trim()) {
                showNotification("Cannot save an empty template.", 'error');
                return;
            }
            localStorage.setItem(`coding_template_${templateId}`, code);
            showNotification(`Template ${templateId} saved successfully!`);
        }

        function loadTemplate(templateId) {
            const savedCode = localStorage.getItem(`coding_template_${templateId}`);
            if (savedCode) {
                codeEditor.value = savedCode;
                showNotification(`Template ${templateId} loaded.`);
            } else {
                showNotification(`Template ${templateId} is empty. Save something first.`, 'error');
            }
        }
        
        function updateSnippets() {
            const lang = languageSelect.value;
            const langSnippets = SNIPPETS[lang];
            snippetSelect.innerHTML = '';
            
            if (langSnippets) {
                for (const [name, code] of Object.entries(langSnippets)) {
                    const option = document.createElement('option');
                    option.value = code;
                    option.textContent = name;
                    snippetSelect.appendChild(option);
                }
            }
        }

       function insertSnippet() {
    const snippetCode = snippetSelect.value;
    const doc = cmEditor.getDoc();
    const cursor = doc.getCursor();
    doc.replaceRange(snippetCode, cursor);
    cmEditor.focus();
}

        function initializeEditor() {
            const lastUsedLang = localStorage.getItem('last_language') || 'cpp';
            languageSelect.value = lastUsedLang;
            
            const lastCode = localStorage.getItem('last_code');
            if(lastCode) {
                codeEditor.value = lastCode;
            } else {
                codeEditor.value = TEMPLATE_PLACEHOLDERS[lastUsedLang];
            }
            updateSnippets();
        }

        function showNotification(message, type = 'success') {
            notificationMessage.textContent = message;
            notification.className = 'fixed bottom-5 right-5 text-white py-2 px-5 rounded-lg shadow-xl';
            if (type === 'error') {
                notification.classList.add('bg-red-500');
            } else {
                notification.classList.add('bg-green-500');
            }
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // --- Event Listeners ---
        runBtn.addEventListener('click', runCode);
        insertSnippetBtn.addEventListener('click', insertSnippet);

        languageSelect.addEventListener('change', (e) => {
            const selectedLang = e.target.value;
            localStorage.setItem('last_language', selectedLang);
            updateSnippets();
            const currentCode = codeEditor.value.trim();
            if(Object.values(TEMPLATE_PLACEHOLDERS).map(p => p.trim()).includes(currentCode)) {
               codeEditor.value = TEMPLATE_PLACEHOLDERS[selectedLang];
            }
        });
        
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('last_code', codeEditor.value);
        });

        // --- Initial Load ---
        document.addEventListener('DOMContentLoaded', initializeEditor);