# com.homemade.save.core

:::info
Version: **1.0.1** <br/>
Github: **_[Link](https://github.com/hungpt17102k/com.homemade.save.core)_** <br/>
Dependencies: 
- **[com.homemade.core](../Unity%20Packages/com.homemade.core.md)**
- **[com.homemade.unitask](../Unity%20Packages/com.homemade.unitask.md)**
:::

## 1. Import

### Download from my registries
- Open Package Manager in Unity.
- Select Packages tab: My Registries.
- Download package: **com.homemade.save.core**
> **Follow the setup: [Click here](../Introduction.md#1-add-scope).**

### Import from github
- Link github: **[Link package](https://github.com/hungpt17102k/com.homemade.save.core)**
- Open Package Manager in Unity 
> **Follow this guide: [Click here](../Introduction.md#import-from-github).**

## 2. Explain

### API

In the `SaveService` is have an `ISaver` interface. This is where you can decide which kind of save you want to use

```cs
public interface ISave
{
    string Path { get; set; }

    void Save(string key, string data);

    string Load(string key);

    void Delete(string key);

    void DeleteAll();

    bool Exists(string key);
}
```

```cs
public class SaveService : ISaveService
{
    private ISave saver;

    public ISave Saver
    {
        get
        {
            return saver;
        }
        set
        {
            saver = value;
        }
    }
}
```

#### Method of `SaveService`
1. Save

```cs
public class SaveService : ISaveService
{
    public void Save<T>(string key, T obj)
    {
        if (string.IsNullOrEmpty(key))
        {
            Debug.Log("<color=red>Error:</color> The key can't be empty or null");
        }
        else
        {
            saver.Save(key, JsonUtility.ToJson(obj));
        }
    }
}
```


2. Load

```cs
public class SaveService : ISaveService
{
    public T Load<T>(string key)
    {
        if (string.IsNullOrEmpty(key))
        {
            Debug.Log("<color=red>Error:</color> The key can't be empty or null");
            return default(T);
        }

        return JsonUtility.FromJson<T>(saver.Load(key));
    }
}
```

3. Delete
```cs
public class SaveService : ISaveService
{
    public void Delete(string key)
    {
        if (string.IsNullOrEmpty(key))
        {
            Debug.Log("<color=red>Error:</color> The key can't be empty or null");
        }
        else
        {
            saver.Delete(key);
        }
    }
}
```

4. DeleteAll

```cs
public class SaveService : ISaveService
{
    public void DeleteAll()
    {
        saver.DeleteAll();
    }
}
```

5. Exists

```cs
public class SaveService : ISaveService
{
    public bool Exists(string key)
    {
        if (string.IsNullOrEmpty(key))
        {
            Debug.Log("<color=red>Error:</color> The key can't be empty or null");
            return false;
        }

        return saver.Exists(key);
    }
}
```

:::note
This package uses 2 kind of save. 
- `PlayerPreSave`: use Unity PlayerPre to save Data.
- `IOSave`: save and load from file.
:::

:::tip
You can change save type even in runtime.
```cs
// Create a new save service
saveService = new SaveService();

// Assgin which save you want
// PlayerPreSave
saveService.Saver = new PlayerPrefsSave();
// IOSave
saveService.Saver = new IOSave();
```
:::



## 3. How to use
When you use add **com.homemade.core** and follow the guide, you can add this service in `GameService.cs`.

```cs
using com.homemade.save.core;
using Cysharp.Threading.Tasks;
using com.homemade.core;

public class GameService : Container<GameService>
{
    // Declare the save service
    private ISaveService saveService;

    private void AddService()
    {
        // Create a new save service
        saveService = new SaveService();

        // Assgin which save you want
        saveService.Saver = new PlayerPrefsSave();

        RegisterService(saveService);
    }

    protected override UniTask OnPreInitialize()
    {
        AddService();

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

In `DataManager.cs` you can write something like this.

```cs
using com.homemade.core;
using Cysharp.Threading.Tasks;
using UnityEngine;

public class DataManager : MonoBehaviour
{
    public static DataManager Instance { get; private set; }

    // Service
    private ISaveService saveService;

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

    private void Start()
    {
        // Get the service you had assign in GameService
        saveService = GameService.Instance.GetService<ISaveService>();

        // Example
        int level = LoadData("Level");
        level = 1;
        SaveData("Level", level);
    }

    public void SaveData<T>(string key, T data)
    {
        saveService.Save(key, data);
    }

    public T LoadData(string key)
    {
        if(!saveService.Exists(key))
        {
            return default;
        }

        return saveService.Load<T>(key);
    }
}
```

## 4. Final
You can create your own `SaveService` base on this package. The choice is your.
