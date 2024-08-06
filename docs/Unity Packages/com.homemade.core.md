# com.homemade.core 

:::info
Version: **1.0.0** <br/>
Github: **_[Link](https://github.com/hungpt17102k/com.homemade.core)_** <br/>
Dependencies: 
- **[com.homemade.unitask](../Unity%20Packages/com.homemade.unitask.md)**
:::

## 1. Import

### Download from my registries
- Open Package Manager in Unity.
- Select Packages tab: My Registries.
- Download package: **com.homemade.core**
> **Follow the setup: [Click here](../Introduction.md#1-add-scope).**

### Import from github
- Link github: **[Link package](https://github.com/hungpt17102k/com.homemade.core)**
- Open Package Manager in Unity 
> **Follow this guide: [Click here](../Introduction.md#import-from-github).**

## 2. Explain
This package will be the core for service collection by using **Dependency Injection**.<br/>
A great design pattern allows us to eliminate rigid dependencies between elements and make the application more flexible, easy to expand, and easy to maintain. <br/>

If you want to use other service package, you need to install this package. Then follow the guide below for how to use this.

## 3. How to use

### Service container

:::note
After install, you should create a script name `GameService.cs`
:::

```cs
using com.homemade.save.core;
using Cysharp.Threading.Tasks;
using com.homemade.core;

public class GameService : Container<GameService>
{
    protected override UniTask OnPreInitialize()
    {
        return base.OnPreInitialize();
    }

    protected override async UniTask OnInitialize()
    {
        await base.OnInitialize();
    }

    protected override UniTask OnPostInitialize()
    {
        return base.OnPostInitialize();
    }
}
```

### Custom service
You can create you own service

#### 1. Create an interface
```cs
using com.homemade.core;

public interface ICustomService : IService
{
    void MyFunction();
}
```

#### 2. Create service
```cs
using com.homemade.core;

public class CustomService : ICustomService
{
    // Order of excute
    public int Priority => 0;

    public CustomService() { }

    // Call when the container initialize
    public async UniTask OnInitialize()
    {
        await UniTask.CompletedTask;
    }

    public void MyFunction()
    {
        Debug.Log("This is a custom service");
    }
}
```

#### 3. Add service
In the script `GameService.cs`.<br/>
Create

```cs
using Cysharp.Threading.Tasks;
using com.homemade.core;

public class GameService : Container<GameService>
{
    // Declare service
    private ICustomService customService;

    // Add service
    private void AddService()
    {
        customService = new CustomService();
        RegisterService(customService);
    }

    // Before initalize the container
    protected override UniTask OnPreInitialize()
    {
        AddService();
        return base.OnPreInitialize();
    }

    // When initalize the container
    protected override async UniTask OnInitialize()
    {
        await base.OnInitialize();
    }

    // After initalize the container
    protected override UniTask OnPostInitialize()
    {
        return base.OnPostInitialize();
    }
}
```

#### 4. Get service
In your `GameManager.cs` you should initialize all the service first. <br/>
You should call service like this.

```cs
using com.homemade.core;
using Cysharp.Threading.Tasks;
using UnityEngine;

public class GameManager : MonoBehaviour
{
    public static GameManager Instance { get; private set; }

    private void Awake()
    {
        if(Instance != null && Instance != this)
        {
            Destroy(this);
        }
        else
        {
            Instance = this;
            DontDestroyOnLoad(this);
        }
    }

    private async void Start()
    {
        // Befor inject
        // Maybe loading, language,...

        // Inject service
        await UniTask.WaitUntil(() => GameService.Instance.IsInitialized);

        // After Inject
        // Maybe init data, init scene,...

        // Or you can call your service
        customService = GameService.Instance.GetService<ICustomService>();
        customService.MyFunction();
    }
}
```

## 4. Final

### Pros
- Separation of Concerns.
- Cut down on shared code in application classes (such as initialization) because all the work of initializing dependencies is taken care of by the injector.
- Easy to expand.
- Unit testing will be easier with mock objects.

### Cons
- If overused, it will lead to maintenance problems because changes will only appear at runtime.

<br/>

:::note
>#### **You can checkout other service package, those packages have denpency on this package.**
:::
