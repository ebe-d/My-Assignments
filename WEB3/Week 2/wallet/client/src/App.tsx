import { useState, useEffect } from 'react';
import { Eye, EyeOff, Terminal } from 'lucide-react';

interface WalletKey {
  privateKey: string;
  publicKey: string;
}

function App() {
  const [keys, setKeys] = useState<WalletKey[]>([]);
  const [showPrivateKeys, setShowPrivateKeys] = useState<Record<number, boolean>>({});
  let no = 0;

  async function fetchstart() {
    const response = await fetch('http://localhost:3000/generateMnemonic');
    const data = await response.json();
    console.log(data);
    const response2 = await fetch('http://localhost:3000/seed');
    const data2 = await response2.json();
    console.log(data2);
  }

  useEffect(() => {
    fetchstart();
  }, []);

  async function generate() {
    const response = await fetch(`http://localhost:3000/derivedseed?No=${no}`);
    if (response.ok) {
      no += 1;
      const data = await response.json();
      setKeys([...keys, data]);
    }
  }

  const togglePrivateKey = (index: number) => {
    setShowPrivateKeys(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="relative min-h-screen bg-black matrix-bg overflow-hidden">
      <div className="scanline absolute inset-0 pointer-events-none" />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <Terminal className="w-12 h-12 text-[#00ff9d]" />
              <h1 className="text-6xl font-bold text-[#00ff9d] animate-[glow_2s_ease-in-out_infinite]">
                CryptoVault
              </h1>
            </div>
            <p className="text-xl text-[#00ff9d]/70">Secure Digital Asset Management</p>
          </div>

          <button
            onClick={generate}
            className="px-8 py-4 bg-transparent border-2 border-[#00ff9d] text-[#00ff9d] rounded-lg
                     text-lg font-mono transform hover:scale-105 transition-all duration-300
                     hover:shadow-lg hover:shadow-[#00ff9d]/50 hover:bg-[#00ff9d]/10
                     relative group overflow-hidden"
          >
            <span className="relative z-10">&gt; Generate Wallet_</span>
            <div className="absolute inset-0 bg-[#00ff9d]/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          </button>

          <div className="w-full max-w-4xl space-y-6">
            {keys.length > 0 ? (
              keys.map((key, index) => (
                <div
                  key={index}
                  className="border border-[#00ff9d]/30 bg-black/80 rounded-lg p-6
                           transform hover:scale-[1.02] transition-all duration-300
                           hover:shadow-xl hover:shadow-[#00ff9d]/20 relative
                           backdrop-blur-sm group"
                >
                  <div className="absolute inset-0 bg-[#00ff9d]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-mono font-semibold text-[#00ff9d]">
                        &gt; Wallet_{index + 1}
                      </h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => togglePrivateKey(index)}
                          className="p-2 hover:bg-[#00ff9d]/10 rounded-lg transition-colors"
                        >
                          {showPrivateKeys[index] ? (
                            <EyeOff className="w-5 h-5 text-[#00ff9d]" />
                          ) : (
                            <Eye className="w-5 h-5 text-[#00ff9d]" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-mono text-[#00ff9d]/70">&gt; Private_Key:</label>
                        <div className="font-mono bg-black/50 border border-[#00ff9d]/20 p-3 rounded-lg break-all text-[#00ff9d]">
                          {showPrivateKeys[index] ? key.privateKey : '•'.repeat(64)}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-mono text-[#00ff9d]/70">&gt; Public_Key:</label>
                        <div className="font-mono bg-black/50 border border-[#00ff9d]/20 p-3 rounded-lg break-all text-[#00ff9d]">
                          {key.publicKey}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 font-mono text-[#00ff9d]/50">
                &gt; No wallets detected_
                <span className="animate-pulse">|</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;