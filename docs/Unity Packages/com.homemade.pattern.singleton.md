# com.homemade.pattern.singleton

:::info
Version: **1.0.0** <br/>
Github: **_[Link](https://github.com/hungpt17102k/com.homemade.pattern.singleton)_**
:::

<!-- Introduction -->
This is simple package for singleton, can use in any project.

## 1. Import

### Download from my registries
- Open Package Manager in Unity.
- Select Packages tab: My Registries.
- Download package: **com.homemade.pattern.singleton**
> **Follow the setup: [Click here](../Introduction.md#1-add-scope).**

### Import from github
- Link github: **[Link package](https://github.com/hungpt17102k/com.homemade.pattern.singleton)**
- Open Package Manager in Unity 
> **Follow this guide: [Click here](../Introduction.md#import-from-github).**

## 2. How to use
```cs
using com.homemade.pattern.singleton;
```

## 3. Example
```cs
using com.homemade.pattern.singleton;

public class GameManager : MonoSingleton<GameManager>
{
    private void Start()
    {
    
    }
}
```

## 4. Explain
- This singleton will automatic create an instance if it's not exist on scene.
- You don't need to attach the script to a GameObject, you can just call the class.
> **You can see the source code for more understand**
