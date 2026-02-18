module.exports = {
  requires: {
    bundle: "ai",
  },
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/SUP3RMASS1VE/Ultimate-TTS-Studio-SUP3R-Edition app",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        conda: "tts_env",
        path: "app",
        message: [
          "conda install -c conda-forge pynini==2.1.6 -y",
          "conda install -y -c conda-forge portaudio",
          "uv pip install gradio devicetorch setuptools==80.9.0",
          "uv pip install -r requirements.txt",
          "uv pip install WeTextProcessing --no-deps",
          "pip uninstall phonemizer-fork -y",
          "pip install phonemizer-fork",
          "uv pip install --upgrade --force-reinstall --no-deps --no-cache-dir onnxruntime-gpu==1.22.0",
          "uv pip install voxcpm openai-whisper --no-deps"
        ]
      }
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          conda: "tts_env",
          path: "app",
          triton: true
        }
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "hf download cocktailpeanut/oa --local-dir ./checkpoints/openaudio-s1-mini",
      }
    },
    {
      when: "{{which('brew')}}",
      method: "shell.run",
      params: {
        message: "brew install espeak-ng"
      },
      next: 'end'
    },
    {
      when: "{{which('apt')}}",
      method: "shell.run",
      params: {
        sudo: true,
        message: "apt-get install -y libaio-dev espeak-ng sox libsox-fmt-all"
      },
      next: 'end'
    },
    {
      when: "{{which('yum')}}",
      method: "shell.run",
      params: {
        sudo: true,
        message: "yum install -y libaio-devel espeak-ng sox"
      },
      next: 'end'
    },
    {
      when: "{{which('winget')}}",
      method: "shell.run",
      params: {
        sudo: true,
        message: [
          "winget install --id=eSpeak-NG.eSpeak-NG -e --silent --accept-source-agreements --accept-package-agreements",
          "winget install --id=ChrisBagwell.SoX -e --silent --accept-source-agreements --accept-package-agreements --force --disable-interactivity"
        ]
      }
    },
    {
      id: 'end',
      method: 'input',
      params: {
        title: "Install Complete!!",
        description: "Install Complete."
      }
    },
  ]
}

